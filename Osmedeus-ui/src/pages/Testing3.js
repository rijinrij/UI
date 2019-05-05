import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import MainSection from '../components/MainSection';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import _ from 'lodash';
import DynamicTable from '@atlaskit/dynamic-table';
import axios from 'axios';
import EmptyState from '@atlaskit/empty-state';
import CodeSnippet from '../components/CodeSnippet';
import Table3 from '../containers/testing3/Table3';
import weapons from '../images/weapons.json';
import Portal from '@atlaskit/portal';
// import Lorem from 'react-lorem-component';
import  ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';

const Padding = styled.div`
  margin: ${gridSize() * 4}px ${gridSize() * 8}px;
  padding-bottom: ${gridSize() * 3}px;
`;

export default class HomePage extends Component {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
  };

  state = { isOpen: false };

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });



  componentDidMount(){

  }

  render() {
    const { isOpen } = this.state;
    const actions = [
      { text: 'Close', onClick: this.close },
    ];

    const content = `
    
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<style type="text/css">
.ansi2html-content { display: inline; white-space: pre-wrap; word-wrap: break-word; }
.body_foreground { color: #000000; }
.body_background { background-color: #000000; }
.body_foreground > .bold,.bold > .body_foreground, body.body_foreground > pre > .bold { color: #000000; font-weight: normal; }
.inv_foreground { color: #000000; }
.inv_background { background-color: #000000; }
</style>
</head>
<body class="body_foreground body_background" style="font-size: normal;" >
<pre class="ansi2html-content">
Target: https://oa.zalo.me/home/FUZZ
Total requests: 16087
==================================================================
ID    Response   Lines      Word         Chars          Request    
==================================================================
00155:  C=200      6 L	       7 W	    155 Ch	  ".gitignore"
01895:  C=200     11 L	      14 W	    131 Ch	  "application/cache/"
02157:  C=200    289 L	     698 W	  13726 Ch	  "blog"
02625:  C=200      6 L	      12 W	    222 Ch	  "crossdomain.xml"
03049:  C=200    300 L	    2045 W	  21937 Ch	  "faq"
03730:  C=200     20 L	     176 W	   1114 Ch	  "license.txt"
04854:  C=200      4 L	      17 W	    170 Ch	  "README.md"
05465:  C=200     11 L	      14 W	    131 Ch	  "system/"
05412:  C=200    143 L	     393 W	   7394 Ch	  "support"
06118:  C=200    287 L	     922 W	  17167 Ch	  "/?q=admin/"
06119:  C=200    287 L	     922 W	  17167 Ch	  "/?q=node/add/"
06197:  C=200     11 L	      14 W	    131 Ch	  "/static/"
06120:  C=200    287 L	     922 W	  17167 Ch	  "/?q=search/"
06121:  C=200    287 L	     922 W	  17167 Ch	  "/?q=comment/reply/"
06122:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user/password/"
06126:  C=200    287 L	     922 W	  17167 Ch	  "/?q=filter/tips/"
06240:  C=200    287 L	     922 W	  17167 Ch	  ""
06207:  C=200    287 L	     922 W	  17167 Ch	  ""
06247:  C=200    287 L	     922 W	  17167 Ch	  "/?"
06287:  C=200    287 L	     922 W	  17167 Ch	  "/?*"
06182:  C=200     11 L	      14 W	    131 Ch	  "/media/"
06124:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user/login/"
06320:  C=200    287 L	     922 W	  17167 Ch	  "/?q=logout/"
06123:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user/register/"
06221:  C=200    287 L	     922 W	  17167 Ch	  ""
06335:  C=200    287 L	     922 W	  17167 Ch	  "/?hl=*&amp;amp;"
06220:  C=200    287 L	     922 W	  17167 Ch	  ""
06222:  C=200    287 L	     922 W	  17167 Ch	  ""
06223:  C=200    287 L	     922 W	  17167 Ch	  ""
06225:  C=200    287 L	     922 W	  17167 Ch	  ""
06501:  C=200    287 L	     922 W	  17167 Ch	  "/?hl=*&amp;amp;*&amp;amp;gws_rd=ssl"
06224:  C=200    287 L	     922 W	  17167 Ch	  ""
06226:  C=200    287 L	     922 W	  17167 Ch	  ""
06543:  C=200    287 L	     922 W	  17167 Ch	  "/?s="
06227:  C=200    287 L	     922 W	  17167 Ch	  ""
06626:  C=200     11 L	      14 W	    131 Ch	  "/system/"
06803:  C=200    287 L	     922 W	  17167 Ch	  "/"
06237:  C=200    287 L	     922 W	  17167 Ch	  ""
06231:  C=200    287 L	     922 W	  17167 Ch	  ""
06872:  C=200    287 L	     922 W	  17167 Ch	  "/?q=contact/"
06239:  C=200    287 L	     922 W	  17167 Ch	  ""
06233:  C=200    287 L	     922 W	  17167 Ch	  ""
06234:  C=200    287 L	     922 W	  17167 Ch	  ""
06235:  C=200    287 L	     922 W	  17167 Ch	  ""
06228:  C=200    287 L	     922 W	  17167 Ch	  ""
06925:  C=200    287 L	     922 W	  17167 Ch	  "/?s=*"
06232:  C=200    287 L	     922 W	  17167 Ch	  ""
06968:  C=200    287 L	     922 W	  17167 Ch	  "/?attachment_id*"
07031:  C=200    287 L	     922 W	  17167 Ch	  "?refresh"
06907:  C=200    289 L	     698 W	  13726 Ch	  "/blog/"
06236:  C=200    287 L	     922 W	  17167 Ch	  ""
06238:  C=200    287 L	     922 W	  17167 Ch	  ""
06241:  C=200    287 L	     922 W	  17167 Ch	  ""
07083:  C=200    287 L	     922 W	  17167 Ch	  "/?show_error=true"
06128:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user/logout/"
07047:  C=200    143 L	     393 W	   7394 Ch	  "/support/"
07826:  C=200    287 L	     922 W	  17167 Ch	  "/?feed="
07758:  C=200    143 L	     393 W	   7394 Ch	  "/support"
07933:  C=200    287 L	     922 W	  17167 Ch	  ""
08306:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user/register"
08390:  C=200     11 L	      14 W	    131 Ch	  "/application/"
08399:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user/login"
08398:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user/password"
08605:  C=200    287 L	     922 W	  17167 Ch	  "/?q=node/add"
08678:  C=200      4 L	      17 W	    170 Ch	  "/README.md"
08769:  C=200    287 L	     922 W	  17167 Ch	  ""
08772:  C=200    287 L	     922 W	  17167 Ch	  "/?action=search"
08729:  C=200    287 L	     922 W	  17167 Ch	  "/?*"
08777:  C=200    287 L	     922 W	  17167 Ch	  "/"
08104:  C=200    148 L	     444 W	   7440 Ch	  "/search?q=*"
08884:  C=200    287 L	     922 W	  17167 Ch	  "/?blackhole"
09126:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user/"
09169:  C=200    287 L	     922 W	  17167 Ch	  "/?p=*"
09660:  C=200    287 L	     922 W	  17167 Ch	  "/?controllerName=search"
09609:  C=200    300 L	    2045 W	  21937 Ch	  "/faq/"
09811:  C=200    287 L	     922 W	  17167 Ch	  ""
09813:  C=200    287 L	     922 W	  17167 Ch	  "/?q=comment/reply"
09790:  C=200    287 L	     922 W	  17167 Ch	  "/?%3Faction=search"
09789:  C=200    287 L	     922 W	  17167 Ch	  "/?%3Fcontrollername=search"
09720:  C=200    289 L	     698 W	  13726 Ch	  "/blog"
09791:  C=200    287 L	     922 W	  17167 Ch	  ""
09968:  C=200    287 L	     922 W	  17167 Ch	  "/?q=search"
09970:  C=200    287 L	     922 W	  17167 Ch	  "/?q=admin"
09971:  C=200    287 L	     922 W	  17167 Ch	  "/?q="
09999:  C=200     20 L	     176 W	   1114 Ch	  "/license.txt"
10043:  C=200    287 L	     922 W	  17167 Ch	  "/"
10228:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user/logout/&lt;/pre&gt;&lt;/body&gt;&lt;/html&gt;"
10237:  C=200    287 L	     922 W	  17167 Ch	  "/?p="
10360:  C=200    287 L	     922 W	  17167 Ch	  ""
10363:  C=200    287 L	     922 W	  17167 Ch	  ""
10387:  C=200    287 L	     922 W	  17167 Ch	  ""
10436:  C=200    287 L	     922 W	  17167 Ch	  ""
10471:  C=200    287 L	     922 W	  17167 Ch	  ""
10573:  C=200      6 L	      12 W	    222 Ch	  "/crossdomain.xml"
10576:  C=200    287 L	     922 W	  17167 Ch	  ""
10408:  C=200    287 L	     922 W	  17167 Ch	  ""
10621:  C=200    287 L	     922 W	  17167 Ch	  ""
10709:  C=200    287 L	     922 W	  17167 Ch	  ""
10662:  C=200    287 L	     922 W	  17167 Ch	  ""
10663:  C=200    287 L	     922 W	  17167 Ch	  ""
10664:  C=200    287 L	     922 W	  17167 Ch	  ""
10645:  C=200    287 L	     922 W	  17167 Ch	  ""
10720:  C=200    287 L	     922 W	  17167 Ch	  ""
10631:  C=200    287 L	     922 W	  17167 Ch	  ""
10670:  C=200    287 L	     922 W	  17167 Ch	  ""
10772:  C=200    287 L	     922 W	  17167 Ch	  "/"
10749:  C=200    287 L	     922 W	  17167 Ch	  ""
10763:  C=200    287 L	     922 W	  17167 Ch	  ""
10824:  C=200    287 L	     922 W	  17167 Ch	  ""
10671:  C=200    287 L	     922 W	  17167 Ch	  ""
10907:  C=200    287 L	     922 W	  17167 Ch	  ""
10890:  C=200    287 L	     922 W	  17167 Ch	  ""
10889:  C=200    287 L	     922 W	  17167 Ch	  ""
10945:  C=200    287 L	     922 W	  17167 Ch	  ""
10972:  C=200    287 L	     922 W	  17167 Ch	  "/?q=filter/tips"
10769:  C=200    287 L	     922 W	  17167 Ch	  ""
10770:  C=200    287 L	     922 W	  17167 Ch	  ""
10768:  C=200    287 L	     922 W	  17167 Ch	  ""
10805:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user"
11028:  C=200    287 L	     922 W	  17167 Ch	  ""
10647:  C=200    287 L	     922 W	  17167 Ch	  ""
10648:  C=200    287 L	     922 W	  17167 Ch	  ""
11029:  C=200    287 L	     922 W	  17167 Ch	  ""
11175:  C=200    287 L	     922 W	  17167 Ch	  "/?se="
10652:  C=200    287 L	     922 W	  17167 Ch	  ""
11251:  C=200    287 L	     922 W	  17167 Ch	  ""
11260:  C=200    287 L	     922 W	  17167 Ch	  ""
11158:  C=200    287 L	     922 W	  17167 Ch	  ""
11263:  C=200    287 L	     922 W	  17167 Ch	  "/?page="
11244:  C=200    287 L	     922 W	  17167 Ch	  "/?q=logout"
11475:  C=200    287 L	     922 W	  17167 Ch	  "/?targetURL=https://www.owler.com/iaApp/getDataCard.htm"
11614:  C=200    287 L	     922 W	  17167 Ch	  ""
11436:  C=200    287 L	     922 W	  17167 Ch	  ""
11668:  C=200    287 L	     922 W	  17167 Ch	  "# empty Disallow instruction SHOULD be there"
11761:  C=200    287 L	     922 W	  17167 Ch	  ""
11778:  C=200    287 L	     922 W	  17167 Ch	  "?wptheme="
11911:  C=200    287 L	     922 W	  17167 Ch	  "/?q=node/"
12059:  C=200    287 L	     922 W	  17167 Ch	  ""
12350:  C=200    287 L	     922 W	  17167 Ch	  "/?s="
11978:  C=200    287 L	     922 W	  17167 Ch	  ""
12559:  C=200    300 L	    2045 W	  21937 Ch	  "/faq"
12721:  C=200    289 L	     698 W	  13726 Ch	  "/blog?page=*"
12912:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user/logout"
12784:  C=200    287 L	     922 W	  17167 Ch	  "/?*"
13514:  C=200    287 L	     922 W	  17167 Ch	  ""
13710:  C=200    287 L	     922 W	  17167 Ch	  "/?q=comment/"
13906:  C=200    287 L	     922 W	  17167 Ch	  "/?cat=*"
13984:  C=200    287 L	     922 W	  17167 Ch	  ""
13709:  C=200    287 L	     922 W	  17167 Ch	  "/?q=hybridauth/"
14132:  C=200    287 L	     922 W	  17167 Ch	  ""
14232:  C=200    287 L	     922 W	  17167 Ch	  ""
14408:  C=200    287 L	     922 W	  17167 Ch	  "/?q=taxonomy/"
14409:  C=200    287 L	     922 W	  17167 Ch	  "/?q=contact"
14412:  C=200    287 L	     922 W	  17167 Ch	  "/?q=*"
14410:  C=200    287 L	     922 W	  17167 Ch	  "/?q=aggregator/"
14238:  C=200    287 L	     922 W	  17167 Ch	  "/?s"
14723:  C=200    287 L	     922 W	  17167 Ch	  "/?id=*"
14724:  C=200    287 L	     922 W	  17167 Ch	  "/?id="
14800:  C=200    300 L	    2045 W	  21937 Ch	  "/faq"
14211:  C=200    148 L	     444 W	   7440 Ch	  "/search/?q=*"
15033:  C=200    287 L	     922 W	  17167 Ch	  ""
15316:  C=200    287 L	     922 W	  17167 Ch	  "/?ref=[\w&amp;amp;='" _. ]+/"
15334:  C=200    287 L	     922 W	  17167 Ch	  "/?q=user/login/&lt;/pre&gt;&lt;/body&gt;&lt;/html&gt;"
15399:  C=200    287 L	     922 W	  17167 Ch	  ""
15523:  C=200    287 L	     922 W	  17167 Ch	  ""
15481:  C=200    287 L	     922 W	  17167 Ch	  ""
14736:  C=200    287 L	     922 W	  17167 Ch	  ""
14735:  C=200    287 L	     922 W	  17167 Ch	  ""
15573:  C=200    287 L	     922 W	  17167 Ch	  ""
15908:  C=200    287 L	     922 W	  17167 Ch	  ""
15879:  C=200    287 L	     922 W	  17167 Ch	  "/?blackhole&lt;/pre&gt;&lt;/body&gt;&lt;/html&gt;"
15919:  C=200    287 L	     922 W	  17167 Ch	  ""
15945:  C=200    287 L	     922 W	  17167 Ch	  ""
15965:  C=200    287 L	     922 W	  17167 Ch	  "/?utm_source="
16052:  C=200    287 L	     922 W	  17167 Ch	  "/?st.layer*"
16062:  C=200    287 L	     922 W	  17167 Ch	  "/?sputnik=*"
15873:  C=200    289 L	     698 W	  13726 Ch	  "/blog/?s=*"
15611:  C=200    287 L	     922 W	  17167 Ch	  "/?frontpage=true"
Total time: 0
Processed Requests: 16087
Filtered Requests: 15909
Requests/sec.: 0

</pre>
</body>

</html>
`
    ;

    return (
      <div>
      <ModalTransition>
            {isOpen && (
              <ModalDialog 
              actions={actions} 
              onClose={this.close} 
              heading="ModalDialog Title"
              width="42em"
              >
                <div dangerouslySetInnerHTML={{ __html: content }} />


              </ModalDialog>
            )}
          </ModalTransition>
        
      <Padding>

        <div>
          <Button onClick={this.open}>Open Modal</Button>

          
        </div>

        {/* <PageTitle>Testing 33</PageTitle> */}
        <EmptyState 
          header={"Payloads"} 
          imageUrl={ _.sample(weapons).src }
          size={"medium"}
          maxImageWidth={100}
        />
        {/* <Table3 /> */}

      </Padding>
      </div>
    );
  }
}
