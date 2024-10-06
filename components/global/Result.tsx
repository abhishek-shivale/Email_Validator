"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export interface ResponseType {
  valid: boolean;
  reason: string;
  validators: {
    regex: {
      valid: boolean;
      reason: string;
    };
    typo: {
      valid: boolean;
      reason: string;
    };
    disposable: {
      valid: boolean;
      reason: string;
    };
    mx: {
      valid: boolean;
      reason: string;
    };
    smtp: {
      valid: boolean;
      reason: string;
    };
  };
}

interface Props {
  result: ResponseType | null | undefined;
  email: string;
}

const ValidatorItem = ({
  label,
  data,
}: {
  label: string;
  data: { valid: boolean; reason: string } | undefined;
}) => {
  if (!data) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`flex items-center justify-between p-3 rounded-lg ${
              data.valid ? "bg-green-100" : "bg-red-100"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-medium">{label}</span>
            {data.valid ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
          </motion.div>
        </TooltipTrigger>
        {data.reason ? (
          <TooltipContent>
            <p>{data.reason}</p>
          </TooltipContent>
        ) : (
          ""
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default function Component({ result, email }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  const validatorItems = [
    { label: "Format", data: result?.validators?.regex },
    { label: "No Typos", data: result?.validators?.typo },
    { label: "Not Disposable", data: result?.validators?.disposable },
    { label: "Valid Domain", data: result?.validators?.mx },
    { label: "Deliverable", data: result?.validators?.smtp },
  ];

  const isValid = result?.valid === true ? true : false;
  const statusColor = isValid ? "text-green-600" : "text-red-600";
  const statusBg = isValid ? "bg-green-100" : "bg-red-100";

  return (
    <>
      <DialogHeader>
        <DialogTitle>Email Validation Results</DialogTitle>
      </DialogHeader>
      <div className="mt-4 space-y-4">
        <div className={`p-4 rounded-lg ${statusBg}`}>
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          {result ? (
            <>
              <p>
                The email address <span className="font-medium">{email}</span>{" "}
                appears to be{" "}
                <span className={`font-bold ${statusColor}`}>
                  {isValid ? "valid" : "invalid"}
                </span>
                .
              </p>
              <p className="mt-2 text-sm">{result.reason}</p>
            </>
          ) : (
            <p>
              Unable to validate the email address at this time. Please try
              again later.
            </p>
          )}
        </div>

        {result && (
          <>
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              className="w-full"
            >
              {showDetails ? "Hide Details" : "Show Details"}
              {showDetails ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  {validatorItems.map((item) => (
                    <ValidatorItem key={item.label} {...item} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-sm text-gray-500 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 mr-1" />
              <span>Hover over each item for more information</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
