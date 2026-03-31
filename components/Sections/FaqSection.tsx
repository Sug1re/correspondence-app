"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BaseHeading } from "../Base/BaseHeading";
import { useFaqs } from "@/hooks/useFaqs";
import { Loading } from "../Loading";
import { Message } from "../Message";

export const FaqSection = () => {
  const { faqs, isLoading, error } = useFaqs();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Message message="FAQの読み込みに失敗しました。" />;
  }

  return (
    <>
      <BaseHeading title="よくあるご質問" />
      {faqs.map((faq) => (
        <Accordion
          key={faq.id}
          sx={{ borderRadius: 2, border: "1px solid rgba(0, 51, 153, 0.1)" }}
          disableGutters
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${faq.id}-content`}
            id={`panel-${faq.id}-header`}
          >
            <Typography
              component="span"
              sx={{ fontSize: 20, color: "#060666ff" }}
            >
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{faq.answer}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
