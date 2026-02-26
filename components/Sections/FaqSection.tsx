import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BaseHeading } from "../Base/BaseHeading";

export const FaqSection = () => {
  return (
    <>
      <BaseHeading title="よくあるご質問" />
      <Accordion
        sx={{ borderRadius: 2, border: "1px solid rgba(0, 51, 153, 0.1)" }}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            component="span"
            sx={{ fontSize: 20, color: "#060666ff" }}
          >
            N高等学校・S高等学校・R高等学校の違いは何ですか？
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          違いは本校の場所が違います。N高は沖縄県うるま市、S高は茨城県つくば市、R高は群馬県桐生市にあります。
          2年次に本校スクーリングがあり、その際に本校に行くことになります。
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ borderRadius: 2, border: "1px solid rgba(0, 51, 153, 0.1)" }}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            component="span"
            sx={{ fontSize: 20, color: "#060666ff" }}
          >
            新入学と転入学の違いは何ですか？
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          新入学は中学3年生、転入学は高校生が対象です。新入学は4月に入学し、転入学は随時受け付けています。
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ borderRadius: 2, border: "1px solid rgba(0, 51, 153, 0.1)" }}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            component="span"
            sx={{ fontSize: 20, color: "#060666ff" }}
          >
            新入学と転入学の違いは何ですか？
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          新入学は中学3年生、転入学は高校生が対象です。新入学は4月に入学し、転入学は随時受け付けています。
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          borderRadius: 2,
          border: "1px solid rgba(0, 51, 153, 0.1)",
          mb: 4,
        }}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            component="span"
            sx={{ fontSize: 20, color: "#060666ff" }}
          >
            新入学と転入学の違いは何ですか？
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          新入学は中学3年生、転入学は高校生が対象です。新入学は4月に入学し、転入学は随時受け付けています。
        </AccordionDetails>
      </Accordion>
    </>
  );
};
