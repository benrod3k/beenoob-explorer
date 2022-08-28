import * as React from "react";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardHeader, CardContent, Typography, Chip } from "@material-ui/core";
import { hexToDate, hexToString, hexToNumber } from "@etclabscore/eserialize";
import { Block as IBlock } from "@etclabscore/ethereum-json-rpc";
import { useTranslation } from "react-i18next";

interface IProps {
  block: IBlock;
}

function timeConverter(UNIX_timestamp: any){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  //var time = a.toISOString().match(/(\d{4}-\d{2}-\d{2})/); //date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec ;
  //return time[1];
  return a.toISOString();  
  //2022-07-31T03:57:52.000Z
}

export default function BlockCard(props: IProps) {
  const { block } = props;
  const { t } = useTranslation();

  if (!block) {
    return null;
  }

  return (
    <Link
      component={({ className, children }: { children: any, className: string }) => (
        <RouterLink className={className} to={`/block/${block.hash}`} >
          {children}
        </RouterLink>
      )}>
      <Card elevation={1}>
        <CardHeader title={hexToNumber(block.number!)}>
        </CardHeader>
        <CardContent>
          <Typography variant="caption" style={{ fontSize: "11px" }}>{block.hash}</Typography>
          <Typography gutterBottom>{timeConverter(hexToNumber(block.timestamp!))}</Typography>
          <Typography gutterBottom>{hexToString(block.extraData!)}</Typography>
          <Chip label={`${block.transactions!.length} Transactions`} />
        </CardContent>
      </Card>
    </Link>
  );
}
