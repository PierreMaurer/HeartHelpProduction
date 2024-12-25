import {View, Text} from "@/components/Themed";
import { Switch} from "@/components/ui/switch";

export default function SelectPediatric({pediatric, setSelectPediatric}: {pediatric: boolean, setSelectPediatric: (value: boolean) => void}) {
    async function setPediatric() {
        setSelectPediatric(!pediatric);
    }
    return (
        <View>
            <Text>Choix de la version pédiatrique</Text>
            <Switch size="md" onToggle={setPediatric} value={pediatric}
            />

        </View>
    );
}
