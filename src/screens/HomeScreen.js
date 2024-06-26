import { ActivityIndicator, Dimensions, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading'
import { WIDTH } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import SplashScreen from './SplashScreen'
import utils from '../utils'
import axios from 'axios'
import { storeNewPost } from '../redux/slice/newPostSlice'
import { storeNewPostReceived } from '../redux/slice/newPostReceivedSlice'
import { storeLoiChuaMoiNgay } from '../redux/slice/loiChuaMoiNgaySlice'

const renderItem = (item, navigation) => (
    <TouchableOpacity key={item.title} style={{marginTop: 28}} activeOpacity={0.7} onPress={() => navigation.navigate('DetailPostScreen', {link: item.link})}>
        <Image source={{uri: item.imgUrl, cache:'default'}} width={WIDTH - 16 * 2} height={240} resizeMode='cover' borderRadius={8} />
        <Text style={{fontSize: 16, color: '#54595f', fontWeight: '600', marginVertical: 8}}>{item.title}</Text>
        {
            item.time == null
            ?
            <Text style={{color: '#adadad'}}>{item.metaData == "" ? "---" : item.metaData}</Text>
            :
            <Text style={{color: '#adadad'}}>{item.time == "" ? "---" : item.time}</Text>
        }
    </TouchableOpacity>
)

export default function HomeScreen({navigation}) {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const newPost = useSelector(state => state.newPost)
    const newPostReceived = useSelector(state => state.newPostReceived)
    const loiChuaMoiNgay = useSelector(state => state.loiChuaMoiNgay)
    const getNewPost = () => {
        axios.get(`${utils.apiUrl}/post/newPost`)
        .then((res) => {
            if(res.data.status == true) {
                const action = storeNewPost(res.data.data.data)
                dispatch(action);
            }
            else{
                const action = storeNewPost([])
                dispatch(action);
            }
        })
        .catch(e => {
            console.log("Có lỗi khi get newPost", e);
            alert("Không thể tải dữ liệu")
            const action = storeNewPost([])
            dispatch(action);
        })
    }
    const getNewPostReceived = () => {
        axios.get(`${utils.apiUrl}/post/newPostReceived`)
            .then((res) => {
                if(res.data.status == true) {
                    const action = storeNewPostReceived(res.data.data.data)
                    dispatch(action);
                }
                else{
                    const action = storeNewPostReceived([])
                    dispatch(action);
                }
            })
            .catch(e => {
                console.log("Có lỗi khi get newPostReceived", e);
                alert("Không thể tải dữ liệu")
                const action = storeNewPost([])
                dispatch(action);
            })
    }
    const getLoiChuaMoiNgay = () => {
        axios.get(`${utils.apiUrl}/post/loiChuaMoiNgay`)
        .then((res) => {
            if(res.data.status == true) {
                const action = storeLoiChuaMoiNgay(res.data.data.data)
                dispatch(action);
            }
            else{
                const action = storeLoiChuaMoiNgay([])
                dispatch(action);
            }
        })
        .catch(e => {
            console.log("Có lỗi khi get newPostReceived", e);
            alert("Không thể tải dữ liệu")
            const action = storeLoiChuaMoiNgay([])
            dispatch(action);
        })
    }
    const getData = () => {
        setRefreshing(true)
        getNewPost()
        getLoiChuaMoiNgay()
        getNewPostReceived()
        setRefreshing(false)
    }
    return (
        <View style={styles.container}>
            <ScrollView
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl onRefresh={getData} refreshing={refreshing}/>
                }
            >
                <Header />
                <View style={styles.newsArea}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>BÀI NỔI BẬT</Text>
                    </View>
                    {
                        newPost == null
                        ?
                        <Loading />
                        :
                        newPost.map((item) => (
                            renderItem(item, navigation)
                        ))
                    }
                    <View style={[styles.titleContainer, {marginTop: 40}]}>
                        <Text style={styles.titleText}>BÀI MỚI NHẬN</Text>
                    </View>
                    {
                        newPostReceived == null
                        ?
                        <Loading />
                        :
                        newPostReceived.map((item) => (
                            renderItem(item, navigation)
                        ))
                    }
                    <View style={[styles.titleContainer, {marginTop: 40}]}>
                        <Text style={styles.titleText}>LỜI CHÚA MỖI NGÀY</Text>
                    </View>
                    {
                        loiChuaMoiNgay == null
                        ?
                        <Loading />
                        :
                        loiChuaMoiNgay.map((item) => (
                            renderItem(item, navigation)
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    newsArea: {
        marginBottom: 20,
        marginTop: 30
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE9B2',
        paddingVertical: 8
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0082D7'
    }
})