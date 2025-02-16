import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, FontAwesome, FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfileById } from '@/services/api';

const ProfileScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const profileId = Array.isArray(id) ? id[0] : id;
    const [profile, setProfile] = useState({
        image: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/480179390_3667516136724913_1364683503257777307_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=1PMu_TO52oAQ7kNvgE83Upv&_nc_oc=AdgP2LcGEiDw0jiJcY_J9D_SqlTEcRJ6jTB1zV8NxFk8ThirM2PWZphsJq0GG5db3zg&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=AsXb1m_sE4nA8mQMCLwSBbB&oh=00_AYBlFsxBcwPxyRD_twZnr-ylY5peWENwSZQLnsa4WnMJWw&oe=67B811D8',
        fullname: 'Nguyễn Văn A',
        rating: '5.0',
    });

    // useEffect(() => {
    //     const fetchData = async () => {
    //       // if (!profileId) return;
    //       try {
    //         console.log("Fetching profile with ID:", profileId); // Debug log
    //         const data = await getProfileById(profileId);
    //         console.log("Profile data received:", data); // Kiểm tra dữ liệu
    //         setProfile(data);
    //       } catch (error) {
    //         console.error("Lỗi khi lấy hồ sơ:", error);
    //       }
    //     };
      
    //     fetchData();
    //   }, [profileId]);
      
    
    //   if (!profile) {
    //     return <Text>Đang tải...</Text>;
    //   }
    

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            console.log("Đã logout thành công!");
            router.push('/Auths/login');
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    };

    const stats = [
        { label: 'Chờ xác nhận', icon: 'wallet' },
        { label: 'Đang xử lí', icon: 'truck' },
        { label: 'Thành công', icon: 'inbox' },
        { label: 'Đã hủy', icon: 'clock' },
    ];

    const menuItems = [
        { label: 'Hỗ trợ', icon: 'question-circle-o', library: FontAwesome },
        { label: 'Cài đặt', icon: 'cogs', library: FontAwesome5 },
        { label: 'Điều khoản & Chính sách', icon: 'file-text', library: FontAwesome },
        { label: 'Chỉnh sửa thông tin', icon: 'edit', library: FontAwesome5 },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image source={{ uri: profile.image }} style={styles.avatar} />
                    <View style={styles.userInfo}>
                        <Text style={styles.shopName}>{profile.fullname}</Text>
                        <View style={styles.ratingContainer}>
                            <FontAwesome name="star" size={16} color="#FFD700" />
                            <Text style={styles.rating}>{profile.rating}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.notificationIcon}>
                    <FontAwesome name="bell" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Thống kê */}
            <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>Tổng quan hằng ngày</Text>
                <View style={styles.statsList}>
                    {stats.map((item, index) => (
                        <View key={index} style={styles.statItem}>
                            <FontAwesome5 name={item.icon} size={24} color="#ed7c44" />
                            <Text style={styles.statLabel}>{item.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Menu chức năng */}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => {
                    const IconComponent = item.library;
                    return (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <IconComponent name={item.icon} size={20} color="#43313A" />
                                <Text style={styles.menuText}>{item.label}</Text>
                            </View>
                            <FontAwesome name="angle-right" size={20} color="#999" />
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Nút đăng xuất */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#699BF4',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 50

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
    userInfo: {
        justifyContent: 'center',
    },
    shopName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    rating: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 5,
    },
    notificationIcon: {
        padding: 10,
    },
    statsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 15
    },
    statsTitle: {
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
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    statLabel: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    menuContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        marginTop: 15
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
        margin: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ProfileScreen;