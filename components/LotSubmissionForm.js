import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


const LotSubmissionForm = ({ navigation }) => (
  <View>
  <FormLabel>Name</FormLabel>
  <FormInput onChangeText={someFunction}/>
  <FormValidationMessage>Error message</FormValidationMessage>
  </View>
);

export default LotSubmissionForm;
