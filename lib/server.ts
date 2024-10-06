import dns from 'dns';
import net from 'net';
import axios from 'axios';
import Mailcheck from 'mailcheck';

interface ValidationResult {
  valid: boolean;
  reason: string | null;
}

interface ValidatorResults {
  regex: ValidationResult;
  typo: ValidationResult;
  disposable: ValidationResult;
  mx: ValidationResult;
  smtp: ValidationResult;
}

interface Suggestion {
  full: string;
}
class EnhancedEmailValidator {
  private emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async validate(email: string): Promise<{ valid: boolean; validators: ValidatorResults; reason: string | null }> {
    const [, domain] = email.split('@');

    const [regex, typo, disposable, mx] = await Promise.all([
      this.checkRegex(email),
      this.checkTypo(email),
      this.checkDisposable(email),
      this.checkMx(domain)
    ]);

    let smtp: ValidationResult = { valid: false, reason: 'SMTP check not performed' };
    if (mx.valid) {
      const bestMxRecord = await this.getBestMxRecord(domain);
      if (bestMxRecord) {
        smtp = await this.checkSmtp(bestMxRecord);
      } else {
        smtp = { valid: false, reason: 'No valid MX records found' };
      }
    }

    const validators: ValidatorResults = { regex, typo, disposable, mx, smtp };
    const valid = Object.values(validators).every(v => v.valid);
    const reason = valid ? null : Object.entries(validators).find(([, v]) => !v.valid)?.[0] || null;

    return { valid, validators, reason };
  }

  private checkRegex(email: string): ValidationResult {
    return {
      valid: this.emailRegex.test(email),
      reason: this.emailRegex.test(email) ? null : 'Invalid email format'
    };
  }

  private checkTypo(email: string): Promise<ValidationResult> {
    return new Promise((resolve) => {
      Mailcheck.run({
        email,
        suggested: (suggestion: Suggestion) => resolve({
          valid: !suggestion,
          reason: suggestion ? `Possible typo. Did you mean ${suggestion.full}?` : null
        }),
        empty: () => resolve({ valid: true, reason: null })
      });
    });
  }

  private async checkDisposable(email: string): Promise<ValidationResult> {
    try {
      const { data } = await axios.get<{ disposable: boolean }>(`https://open.kickbox.com/v1/disposable/${email}`);
      return {
        valid: !data.disposable,
        reason: data.disposable ? 'Disposable email detected' : null
      };
    } catch (error) {
      console.error('Error checking disposable email:', error);
      return { valid: true, reason: 'Unable to check if disposable' };
    }
  }

  private async checkMx(domain: string): Promise<ValidationResult> {
    return new Promise((resolve) => {
      dns.resolveMx(domain, (error, addresses) => {
        if (error) {
          resolve({ valid: false, reason: `MX check failed: ${error.message}` });
        } else {
          resolve({ valid: addresses.length > 0, reason: addresses.length > 0 ? null : 'No MX records found' });
        }
      });
    });
  }

  private async getBestMxRecord(domain: string): Promise<string | null> {
    return new Promise((resolve) => {
      dns.resolveMx(domain, (error, addresses) => {
        if (error || !addresses || addresses.length === 0) {
          resolve(null);
        } else {
          const sortedMx = addresses.sort((a, b) => a.priority - b.priority);
          resolve(sortedMx[0].exchange);
        }
      });
    });
  }

  private checkSmtp(mxRecord: string): Promise<ValidationResult> {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      socket.setTimeout(50000000);

      socket.connect(25, mxRecord, () => {
        socket.destroy();
        console.log('SMTP connection successful', mxRecord);
        resolve({ valid: true, reason: null });
      });

      socket.on('error', (error) => {
        socket.destroy();
        resolve({ valid: false, reason: `SMTP connection failed: ${error.message}` });
      });

      socket.on('timeout', () => {
        socket.destroy();
        resolve({ valid: false, reason: 'SMTP connection timed out' });
      });
    });
  }
}

export async function validateEmails(email: string): Promise<{ valid: boolean;
  validators: ValidatorResults;
  reason: string | null}> {
  const validator = new EnhancedEmailValidator();
  const result = await validator.validate(email);
  return result;
}