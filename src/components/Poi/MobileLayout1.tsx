import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import { typographyClasses } from "@mui/joy/Typography";

export default function MobileLayout({
  children,
  reversed,
  pic,
}: React.PropsWithChildren<{ reversed?: boolean }>) {
  return (
    <Container
      sx={(theme) => ({
        position: "relative",
        minHeight: "100%",
        display: "flex",
        flexDirection: reversed ? "column-reverse" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        [theme.breakpoints.up(834)]: {
          flexDirection: "row",
          gap: 6,
        },
        [theme.breakpoints.up(1199)]: {
          gap: 12,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent:"center",
          minWidth: "90vw",
          textAlign: "center",
          [theme.breakpoints.up(834)]: {
            minWidth: 420,
            alignItems: "flex-end",
            textAlign: "initial",
            justifyContent:"center",
          },
          [`& .${typographyClasses.root}`]: {
            textWrap: "balance",
          },
        })}
      >
        {children}
      </Box>
      <AspectRatio
        ratio="3/4"
        variant="outlined"
        maxHeight="45vh"
        sx={(theme) => ({
          minWidth: "45vw",
          alignSelf: "stretch",
          justifyContent: "center",
          [theme.breakpoints.up(834)]: {
            alignSelf: "initial",
            flexGrow: 1,
            
          },
          borderRadius: "sm",
          bgcolor: "background.level2",
          flexBasis: "45%",
        })}
      >
        <img src={pic} alt="" />
      </AspectRatio>
    </Container>
  );
}
