import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import {
  Button,
  ButtonText,
} from "@/components/ui/button"
import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, {useEffect, useState} from "react";
import {FontAwesome5} from "@expo/vector-icons";
import {Link} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditScreenInfo from "@/components/EditScreenInfo";
import InfoLegalComponent from "@/components/InfoLegalComponent";

export default function TabOneScreen() {
  const [firstOpening, setFirstOpening] = useState<any>(true);
  useEffect(() => {
    async function reset() {
      await AsyncStorage.setItem('noflow', '0');
      await AsyncStorage.setItem('lowflow', '0');
      await AsyncStorage.setItem('lowflowtemoin', '0');
      await AsyncStorage.setItem('choc', '0');
      await AsyncStorage.setItem('analyse', '0');

      await AsyncStorage.setItem('Adrenaline_name', "Adrenaline")
      await AsyncStorage.setItem('Adrenaline_timer', '6');
      await AsyncStorage.setItem('Adrenaline_history', "")
      await AsyncStorage.setItem('Amiodarone_name', "Amiodarone")
      await AsyncStorage.setItem('Amiodarone_history', "")
      await AsyncStorage.setItem('Amiodarone_timer', '0');
      }
    reset();
  }, []);

  return (
    <View style={styles.container}>
      <InfoLegalComponent />
      <View style={styles.button_container}>
        <Link key={"adult"} href={"/reanimation?type=adult"} asChild>
        <Button style={styles.button} variant="solid" action="negative" >
          <FontAwesome5
              name="user"
              size={30}
              color={Colors.light.background}
              style={{ opacity: 1, paddingRight: 10 }}
          />
          <ButtonText>Réanimation Adulte</ButtonText>
        </Button>
        </Link>
      </View>

      <View>
        <Link key={"pedia"} href="/reanimation?type=pediatric" asChild>
          <Button style={styles.button} variant="solid" action="negative">
            <FontAwesome5
                name="baby"
                size={35}
                color={Colors.light.background}
                style={{ opacity: 1, paddingRight: 10 }}
            />
            <ButtonText>Réanimation Pédiatrique</ButtonText>
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  button_container: {
    marginBottom: 50,
  },
  button: {
    width: 338,
    height: 170,
    borderRadius: 20,
    backgroundColor: "#D60034",
  }
});
