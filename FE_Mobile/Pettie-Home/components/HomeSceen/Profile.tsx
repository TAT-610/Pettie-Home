import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, FontAwesome, FontAwesome5, FontAwesome6, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '@/services/types';
import { getUserAccount } from '@/services/user/auth';

const ProfileScreen = () => { 
    const router = useRouter();
    // const [id, setId] = useState<string | null>(null);
    // const {userData} = useLocalSearchParams();
     
    const [profile, setProfile] = useState<Profile | null>(null);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const userData = await getUserAccount();
                    console.log("User Data in Profile", userData.data);
                    setProfile(userData.data);
                } catch (error) {
                    console.error("Error to fetch Data User", error)
                }
            }
        fetchData();

        }, [])
    )



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

    const handleEditProfile = () => {
        console.log("navigate editprofile");

        if (profile?.id) {
            // encodeURIComponent giúp tránh lỗi khi truyền JSON qua URL.
            router.push(`/ProfileCustomer/[editprofile]?profile=${encodeURIComponent(JSON.stringify(profile))}`);
        } else {
            console.error("Không có ID để chuyển trang");
        }
    };

    const stats = [
        { label: 'Chờ xác nhận', icon: FontAwesome5, name: 'clipboard-list' },
        { label: 'Đang xử lí', icon: FontAwesome6, name: 'truck-fast' },
        { label: 'Lịch sử đơn hàng', icon: FontAwesome5, name: 'clock' },
        { label: 'Đã hủy', icon: MaterialCommunityIcons, name: 'cart-remove' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image source={{ uri: profile.image }} style={styles.avatar} />
                    <Text style={styles.shopName}>{profile.fullName}</Text>
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
            <View style={styles.cardmenu}>
                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                        <FontAwesome name="question-circle-o" size={20} color="#ed7c44" />
                        <Text style={styles.menuText}>Hỗ trợ</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} >
                    <View style={styles.menuItemLeft}>
                        <FontAwesome name="cogs" size={20} color="#ed7c44" />
                        <Text style={styles.menuText}>Cài đặt</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} >
                    <View style={styles.menuItemLeft}>
                        <FontAwesome name="file-text" size={20} color="#ed7c44" />
                        <Text style={styles.menuText}>Điều khoản & Chính sách</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
                    <View style={styles.menuItemLeft}>
                        <FontAwesome name="edit" size={20} color="#ed7c44" />
                        <Text style={styles.menuText}>Chỉnh sửa thông tin</Text>
                    </View>
                </TouchableOpacity>
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
    cardmenu: {
        backgroundColor: "#fff",
        marginTop: 20,
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
