import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const questions = [
  {
    question: "1. What is email validation?",
    answer:
      "Email validation is the process of verifying that an email address is valid and deliverable.",
  },
  {
    question: "2. Why do I need email validation?",
    answer:
      "Validating emails helps improve your email deliverability, reduces bounce rates, and protects your sender reputation.",
  },
  {
    question: "3. How do I use email validation?",
    answer:
      "Email validation is a crucial step in email delivery. It ensures that your emails are delivered to the right recipients and that they meet all the necessary criteria.",
  },
  {
    question: "4. Is email validation free?",
    answer:
      "Email validation is completely free for everyone, regardless of their email address. You can always use it at no cost.",
  },
  {
    question: "5. Can I use email validation for free?",
    answer: "Yes, email validation is completely free for everyone. You can always use it at no cost.",
  },
  {
    question: "6. How can I check bulk email validation?",
    answer: "Our bulk email validation feature is currently under development and will be available soon. Stay tuned for updates!"
  }

];
