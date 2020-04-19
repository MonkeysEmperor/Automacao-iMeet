import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Segunda-feira</h4>
            <p className={classes.cardCategoryWhite}>
              Semana #2 de abril 2020
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Horário", "Número de participantes", "Responsável", "Temperatura"]}
              tableData={[
                ["8:00 - 9:00", "4", "Guilherme Matarazzo", "22C"],
                ["10:00 - 12:00", "6", "Jorge Souza", "23C"],
                ["14:00 - 15:00", "2", "Paulo Banhos", "21C"],
                ["16:00 - 18:00", "8", "Rafael Garcia", "20C"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Terça-feira</h4>
            <p className={classes.cardCategoryWhite}>
              Semana #2 de abril 2020
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Horário", "Número de participantes", "Responsável", "Temperatura"]}
              tableData={[
                ["8:00 - 9:00", "4", "Guilherme Matarazzo", "22C"],
                ["10:00 - 12:00", "6", "Jorge Souza", "23C"],
                ["14:00 - 15:00", "2", "Paulo Banhos", "21C"],
                ["16:00 - 18:00", "8", "Rafael Garcia", "20C"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
