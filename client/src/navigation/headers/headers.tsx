import { TouchableOpacity, Text } from "react-native"

export const headerRightForAddProduct = () => (
    <TouchableOpacity onPress={() => alert('Готово')}>
        <Text style={{ paddingRight: 19, color: 'blue' }}>Готово</Text>
    </TouchableOpacity>
)