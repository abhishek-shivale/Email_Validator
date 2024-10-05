// "use server";
// const KICKBOX_API_BASE_URL = "https://open.kickbox.com/v1/disposable/";
// import dns from "node:dns";
// import util from "util";
// import net from "node:net";

// const promisify = util.promisify;
// const resolveMx = promisify(dns.resolveMx);

// export async function checkEmail(email: string) {
//   const res = {
//     valid: true,
//     reason: "All validations passed",
//     validators: {
//       regex: {
//         valid: true,
//         reason: "Passed",
//       },
//       disposable: {
//         valid: true,
//         reason: "Passed",
//       },
//       mx: {
//         valid: true,
//         reason: "Passed",
//       },
//       smtp: {
//         valid: true,
//         reason: "Passed",
//       },
//     },
//   };

//   // Step 1: Regex validation
//   if (!checkEmailRegex(email)) {
//     res.valid = false;
//     res.reason = "Invalid Email";
//     res.validators.regex.valid = false;
//     res.validators.regex.reason = "Invalid Email";
//   }

//   if (await isDisposableEmail(email)) {
//     res.valid = false;
//     res.reason = "Disposable Email";
//     res.validators.disposable.valid = false;
//     res.validators.disposable.reason = "Disposable Email";
//   }

//   const mxRecord = await getBestMx(email);
//   if (!mxRecord) {
//     res.valid = false;
//     res.reason = "No MX Record";
//     res.validators.mx.valid = false;
//     res.validators.mx.reason = "No MX Record";
//     res.validators.smtp.valid = false;
//     res.validators.smtp.reason = "SMTP Error";
//   } else {
//     const isSmtpValid = await checkEmailSmtp(mxRecord.exchange);
//     if (!isSmtpValid) {
//       res.valid = false;
//       res.reason = "SMTP Error";
//       res.validators.smtp.valid = false;
//       res.validators.smtp.reason = "SMTP Error";
//     }
//   }

//   return res;
// }

// function checkEmailRegex(email: string): boolean {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// async function isDisposableEmail(email: string): Promise<boolean> {
//   try {
//     const response = await fetch(`${KICKBOX_API_BASE_URL}${email}`);
//     const result = await response.json();
//     return result.disposable;
//   } catch (error) {
//     console.error("Error checking disposable email:", error);
//     return false;
//   }
// }

// async function checkEmailMxRecord(domain: string): Promise<dns.MxRecord[]> {
//   try {
//     const mxRecords = await resolveMx(domain);
//     if (mxRecords.length > 0) {
//       return mxRecords;
//     }
//   } catch (error) {
//     console.error("Error resolving MX record:", error);
//   }
//   return [];
// }

// async function getBestMx(email: string): Promise<dns.MxRecord | null> {
//   const domain = email.split("@")[1];
//   const addresses = await checkEmailMxRecord(domain);

//   if (addresses.length === 0) return null;

//   let bestRecord = addresses[0];
//   for (let i = 1; i < addresses.length; i++) {
//     if (addresses[i].priority < bestRecord.priority) {
//       bestRecord = addresses[i];
//     }
//   }
//   return bestRecord;
// }

// async function checkEmailSmtp(exchange: string): Promise<boolean> {
//   return new Promise((resolve) => {
//     const timeout = 10000; // 10 seconds
//     const server = net.createConnection({ host: exchange, port: 25 });

//     server.setEncoding("ascii");
//     server.setTimeout(timeout);

//     server.on("connect", () => {
//       console.log("SMTP server is available");
//       server.write("quit\r\n");
//       server.end();
//       resolve(true);
//     });

//     server.on("error", (err) => {
//       console.error("SMTP server is unavailable:", err.message);
//       server.end();
//       resolve(false);
//     });

//     server.on("timeout", () => {
//       console.error("SMTP server check timed out");
//       server.end();
//       resolve(false);
//     });
//   });
// }
