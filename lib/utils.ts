import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export const questions = [
  {
    question: "1. What is email validation?",
    answer: "Email validation is the process of verifying if an email address is valid and deliverable, ensuring it follows the correct format and exists on the mail server."
  },
  {
    question: "2. Why is email validation important?",
    answer: "Validating emails helps reduce bounce rates, improves deliverability, and enhances sender reputation, ultimately leading to better email marketing performance."
  },
  {
    question: "3. What methods are used for email validation?",
    answer: "Common methods include regex checks for syntax, domain/MX record verification, SMTP checks, and identifying disposable email addresses."
  },
  {
    question: "4. Can I validate emails in bulk?",
    answer: "Yes, many email validation services offer bulk verification options, allowing you to upload lists for processing."
  },
  {
    question: "5. Are there free email validation services?",
    answer: "Yes, several platforms provide free email validation for a limited number of checks each month."
  },
  {
    question: "6. How does disposable email detection work?",
    answer: "Disposable email detection identifies temporary email addresses often used for short-term purposes, helping to filter out non-genuine sign-ups."
  },
  {
    question: "7. What is an MX record check?",
    answer: "An MX record check verifies that the domain of the email address has a mail server configured to receive emails, confirming its deliverability."
  },
  {
    question: "8. How accurate are email validation services?",
    answer: "Most reputable services claim accuracy rates above 95%, but this can vary based on the method and data quality used."
  },
  {
    question: "9. Can I integrate email validation into my application?",
    answer: "Yes, many email validation services offer APIs that allow integration into your applications for real-time or batch processing."
  },
  {
    question: "10. What are the benefits of using an email validator?",
    answer: "Using an email validator helps maintain a clean mailing list, reduces spam complaints, and increases overall engagement rates in your campaigns."
  }
];

export interface responseType {
  valid: boolean,
  reason: string,
  validators: {
    regex: {
      valid: boolean,
      reason: string,
    },
    typo:{
      valid: boolean,
      reason: string,
    },
    disposable: {
      valid: boolean,
      reason: string,
    },
    mx: {
      valid: boolean,
      reason: string,
    },
    smtp: {
      valid: boolean,
      reason: string,
    },
  },
};
