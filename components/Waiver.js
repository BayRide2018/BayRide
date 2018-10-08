import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button , Text } from 'native-base';
import style from '../public/style';


export default class Waiver extends Component {
  
  render () {
    return (
      <View style={style.background2} >

        <View style={{ marginTop: 30 }} >
          <Text style={{ alignSelf: 'center' }} >Terms and Conditions</Text>
        </View>

        <View style={style.horizontalRule} />

        <ScrollView>
            <Text style={{ fontSize: 15, margin: 5 }} >BayRide Mobile Application End User License Agreement 
                  This Mobile Application End User License Agreement ("Agreement") is a binding agreement between you ("End User") and BayRide Inc. This Agreement governs your use of the BayRide’s proprietary ridesharing fare auction technology (RFAT) mobile application for Apple iOS or Google Android operating systems (including all related documentation). 
                  BY DOWNLOADING/INSTALLING/USING THE APPLICATION, YOU (A) ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTAND THIS AGREEMENT; (B) REPRESENT THAT YOU ARE OF LEGAL AGE TO ENTER INTO A BINDING AGREEMENT; AND (C) ACCEPT THIS AGREEMENT AND AGREE THAT YOU ARE LEGALLY BOUND BY ITS TERMS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT DOWNLOAD/ INSTALL/USE THE BAYRIDE MOBILE APPLICATION. 
                  1. License Grant. Subject to the terms of this Agreement, BayRide Inc. grants you a limited, non-exclusive and nontransferable license to: 
                  (a) download, install and use the BayRide Mobile Application for your personal, non- commercial use on a single mobile device owned or otherwise controlled by you ("Mobile Device") strictly in accordance with the BayRide Mobile Application's documentation. 
                  2. License Restrictions. Licensee shall not: 
                  (a)  copy the BayRide Mobile Application, except as expressly permitted by this license; 
                  (b)  modify, translate, adapt or otherwise create derivative works or 
                  improvements, whether or not patentable, of the BayRide Mobile Application; 
                  (c) reverse engineer, disassemble, decompile, decode or otherwise attempt to derive or gain access to the source code of the BayRide Mobile Application or any part thereof; 
                  (d) remove, delete, alter or obscure any trademarks or any copyright, trademark, patent or other intellectual property or proprietary rights notices from the BayRide Mobile Application, including any copy thereof; 
                  (e) rent, lease, lend, sell, sublicense, assign, distribute, publish, transfer or otherwise make available the BayRide Mobile Application or any features or functionality of the Application, to any third party for any reason, including by making the BayRide Mobile Application available on a network where it is capable of being accessed by more than one device at any time; or 
                  (f) remove, disable, circumvent or otherwise create or implement any workaround to any copy protection, rights management or security features in or protecting the BayRide Mobile Application. 
                  3. Reservation of Rights. 	You acknowledge and agree that the Application is provided under license, and not sold, to you. You do not acquire any ownership interest in the Application under this Agreement, or any other rights thereto other than to use the Application in accordance with the license granted, and subject to all terms, conditions and restrictions, under this Agreement. BayRide Inc. and its licensors and service providers reserve and shall retain their entire right, title and interest in and to the Application, including all copyrights, trademarks and other intellectual property rights therein or relating thereto, except as expressly granted to you in this Agreement. 
                  4. Collection and Use of Your Information. 	You acknowledge that when you download, install or use the Application, BayRide Inc. may use automatic means (including, for example, cookies and web beacons) to collect information about your Mobile Device and about your use of BayRide’s mobile application. You also may be required to provide certain information about yourself as a condition to downloading, installing or using the BayRide Application or certain of its features or functionality, and the Application may provide you with opportunities to share information about yourself with others. All information we collect through or in connection with this Application is subject to our Privacy Policy at https://www.bayrideinc.com. By downloading, installing, using and providing information to or through the BayRide Mobile Application, you consent to all actions taken by us with respect to your information in compliance with the Privacy Policy. 
                  5. Updates. 	BayRide Inc. may from time to time in its sole discretion develop and provide Application updates, which may include upgrades, bug fixes, patches and other error corrections and/or new features (collectively, including related documentation, "Updates"). Updates may also modify or delete in their entirety certain features and functionality. You agree that BayRide Inc. has no obligation to provide any Updates or to continue to provide or enable any particular features or functionality. Based on your Mobile Device settings, when your Mobile Device is connected to the internet either: 
                  (a) the BayRide Mobile Application will automatically download and install all available Updates; or 
                  (b) you may receive notice of or be prompted to download and install available Updates. 
                  You shall promptly download and install all Updates and acknowledge and agree that the BayRide Mobile Application or portions thereof may not properly operate should you fail to do so. You further agree that all Updates will be deemed part of the BayRide Mobile Application and be subject to all terms and conditions of this Agreement. 
                  6. Term and Termination. 
                  (a) The term of Agreement commences when you download/install the BayRide Mobile Application and will continue in effect until terminated by you or BayRide Inc. as set forth in this Section 6. 
                  (b) You may terminate this Agreement by deleting the BayRide Mobile application and all copies thereof from your Mobile Device. 
                  (c) BayRide Inc. may terminate this Agreement at any time without notice if it ceases to support the Application, which BayRide Inc. may do in its sole discretion. In addition, this Agreement will terminate immediately and automatically without any notice if you violate any of the terms and conditions of this Agreement. 
                  (d) Upon termination:
                  (i) all rights granted to you under this Agreement will also terminate; 
                  and 
                  (ii) you must cease all use of the Application and delete all copies of the BayRide mobile application from your Mobile Device and account. 
                  (e) Termination will not limit any of BayRide Inc.'s rights or remedies at law or in equity. 
                  7. Disclaimer of Warranties. 	THE BAYRIDE MOBILE APPLICATION IS PROVIDED TO LICENSEE "AS IS" AND WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, COMPANY, ON ITS OWN BEHALF AND ON BEHALF OF ITS AFFILIATES AND ITS AND THEIR RESPECTIVE LICENSORS AND SERVICE PROVIDERS, EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, WITH RESPECT TO THE BAYRIDE MOBILE APPLICATION, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT, AND WARRANTIES THAT MAY ARISE OUT OF COURSE OF DEALING, COURSE OF PERFORMANCE, USAGE OR TRADE PRACTICE. WITHOUT LIMITATION TO THE FOREGOING, COMPANY PROVIDES NO WARRANTY OR UNDERTAKING, AND MAKES NO REPRESENTATION OF ANY KIND THAT THE APPLICATION WILL MEET YOUR REQUIREMENTS, ACHIEVE ANY INTENDED RESULTS, BE COMPATIBLE OR WORK WITH ANY OTHER SOFTWARE, APPLICATIONS, SYSTEMS OR SERVICES, OPERATE WITHOUT INTERRUPTION, MEET ANY PERFORMANCE OR RELIABILITY STANDARDS OR BE ERROR FREE OR THAT ANY ERRORS OR DEFECTS CAN OR WILL BE CORRECTED. 
                  SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF OR LIMITATIONS ON IMPLIED WARRANTIES OR THE LIMITATIONS ON THE APPLICABLE STATUTORY RIGHTS OF A CONSUMER, SO SOME OR ALL OF THE ABOVE EXCLUSIONS AND LIMITATIONS MAY NOT APPLY TO YOU. 
                  8. Limitation of Liability. 	TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL COMPANY OR ITS AFFILIATES, OR ANY OF ITS OR THEIR RESPECTIVE LICENSORS OR SERVICE PROVIDERS, HAVE ANY LIABILITY FOR DAMAGES ARISING FROM OR RELATED TO YOUR USE OF OR INABILITY TO USE THE BAYRIDE MOBILE APPLICATION. 
                  THE FOREGOING LIMITATIONS WILL APPLY WHETHER SUCH DAMAGES ARISE OUT OF BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE) OR OTHERWISE AND REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE OR COMPANY WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS OF LIABILITY SO SOME OR ALL OF THE ABOVE LIMITATIONS OF LIABILITY MAY NOT APPLY TO YOU. 
                  9. Indemnification. 	You agree to indemnify, defend and hold harmless BayRide Inc. and its officers, directors, employees, agents, affiliates, successors and assigns from and against any and all losses, damages, liabilities, deficiencies, claims, actions, judgments, settlements, interest, awards, penalties, fines, costs, or expenses of whatever kind, including attorneys' fees, arising from or relating to your use or misuse of the BayRide Mobile Application or your breach of this Agreement. Furthermore, you agree that BayRide Inc. assumes no responsibility for the content you submit or make available through this Application. 
                  10. Export Regulation. 	The BayRide Mobile Application may be subject to US export control laws, including the US Export Administration Act and its associated regulations. You shall not, directly or indirectly, export, re-export or release the BayRide Mobile Application to, or make the BayRide Mobile Application accessible from, any jurisdiction or country to which export, re-export or release is prohibited by law, rule or regulation. You shall comply with all applicable federal laws, regulations and rules, and complete all required undertakings (including obtaining any necessary export license or other governmental approval), prior to exporting, re-exporting, releasing or otherwise making the BayRide Mobile Application available outside the US. 
                  11. Severability. 	If any provision of this Agreement is illegal or unenforceable under applicable law, the remainder of the provision will be amended to achieve as closely as possible the effect of the original term and all other provisions of this Agreement will continue in full force and effect. 
                  12. Governing Law. 	This Agreement is governed by and construed in accordance with the internal laws of the State of Michigan without giving effect to any choice or conflict of law provision or rule. Any legal suit, action or proceeding arising out of or related to this Agreement or the BayRide Mobile Application shall be instituted exclusively in the federal courts of the United States. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts. 
                  13. Provisional Agreement. 	This Agreement and our Privacy Policy only constitute a provisional agreement between you and BayRide Inc. with respect to the BayRide Mobile Application and its proprietary technology and is subject to change at any time at the behest of BayRide Inc. 
                  14. Waiver. 	No failure to exercise, and no delay in exercising, on the part of either party, any right or any power hereunder shall operate as a waiver thereof, nor shall any single or partial exercise of any right or power hereunder preclude further exercise of that or any other right hereunder. In the event of a conflict between this Agreement and any applicable purchase or other terms, the terms of this Agreement shall govern. 
                  </Text>
          <View style={{ margin: 9 }} >
            <Button
              style={style.button}
              onPress={() => this.props.navigation.navigate('DrawerNavigator')}
              ><Text style={style.buttonText} >I agree</Text></Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}
