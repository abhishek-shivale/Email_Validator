import React from 'react';


const Header = () => {
  return (
    <header className=" text-primary-foreground p-6 ">
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MailIcon className="w-6 h-6" />
          <span className="text-xl font-bold">Email Validator</span>
        </div>
        <p className="text-sm text-primary-foreground/80 hidden md:block">
          Quickly validate email addresses with our powerful email validation tool.
        </p>
      </div>
    </header>
  );
};






const MailIcon = (props:React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
};

export default Header;
