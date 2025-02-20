import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, FontAwesome, FontAwesome5, FontAwesome6, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfileById } from '@/services/api';
import { Profile } from '@/services/types';

const ProfileScreen = () => {
    const router = useRouter();
    const [id, setId] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchId = async () => {
            try {
                const storedId = await AsyncStorage.getItem('idUser');
                setId(storedId);
            } catch (error) {
                console.error('Error retrieving idUser:', error);
            }
        };
        fetchId();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const data = await getProfileById(id);
                setProfile(data);
            } catch (error) {
                console.error('Lỗi khi lấy hồ sơ:', error);
            }
        };
        fetchData();
    }, [id]);

    if (!profile) {
        return <Text>Đang tải...</Text>;
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('idUser');
            router.push('/Auths/login');
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };

    const stats = [
        { label: 'Chờ xác nhận', icon: FontAwesome5, name: 'clipboard-list' },
        { label: 'Đang xử lí', icon: FontAwesome6 , name: 'truck-fast' },
        { label: 'Lịch sử đơn hàng', icon: FontAwesome5, name: 'clock' },
        { label: 'Đã hủy', icon: MaterialCommunityIcons, name: 'cart-remove' },
    ];

    const menuItems = [
        { label: 'Hỗ trợ', icon: FontAwesome, name: 'question-circle-o' },
        { label: 'Cài đặt', icon: FontAwesome5, name: 'cogs' },
        { label: 'Điều khoản & Chính sách', icon: FontAwesome, name: 'file-text' },
        { label: 'Chỉnh sửa thông tin', icon: FontAwesome5, name: 'edit' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image source={{ uri: profile.image }} style={styles.avatar} />
                    <Text style={styles.shopName}>{profile.fullname}</Text>
                </View>
                <TouchableOpacity style={styles.notificationIcon}>
                    <FontAwesome name="bell" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Đơn hàng</Text>
                <View style={styles.statsList}>
                    {stats.map((item, index) => (
                        <View key={index} style={styles.statItem}>
                            <item.icon name={item.name} size={24} color="#ed7c44" />
                            <Text style={styles.statLabel}>{item.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <item.icon name={item.name} size={20} color="#ed7c44" />
                            <Text style={styles.menuText}>{item.label}</Text>
                        </View>
                        <FontAwesome name="angle-right" size={20} color="#999" />
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9f1ff',
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#699BF4',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 50,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    shopName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    notificationIcon: {
        padding: 10,
    },
    section: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 15,
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    statsList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#ed7c44',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ProfileScreen;
