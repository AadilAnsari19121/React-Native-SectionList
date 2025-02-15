//-----Hello guys, my name is Aadil. Please guide and support me in gaining more knowledge about technology-----
import { SectionList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FoodSpendHistory from './FoodHistoryArrayObject.json';

const SectionListDisplay = () => {
    const truncateTitle = (title) => title.length > 20 ? `${title.slice(0, 20)}...` : title;

    const DecodeDate = async (dateTime) => {
        const date = new Date(dateTime);
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = days[date.getDay()];
        const month = months[date.getMonth()];
        const dayNumber = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        minutes = minutes.toString().padStart(2, "0"); 
        return `${day}, ${dayNumber} ${month} | ${hours}:${minutes} ${ampm}`;
    }

    const SectionD = FoodSpendHistory.map((item) => ({
        title: item.MonthDT,
        data: item.Mdata,
        cost: item.MCost
    }));


    const renderSectionHeaderData = ({ section: { title, cost } }) => (
        <View style={styles.SecHeaderCon}>
            <Text style={styles.SecHeader}>{title}</Text>
            <Text style={styles.SecHeader}>{cost} ₹ </Text>
        </View>
    );

    const renderItemData = ({ item }) => (
        <View style={styles.cardContainer}>
            <View>
                <Text style={styles.title}>{truncateTitle(item.ItemName)}</Text>
                <Text style={styles.subtitle}>{DecodeDate(item.Time)}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>₹ {item.Amount}</Text>
            </View>
        </View>
    );

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <SectionList
                sections={SectionD}
                renderSectionHeader={renderSectionHeaderData}
                renderItem={renderItemData}
                keyExtractor={(item,index)=>item+index}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    SecHeader: {fontSize: 20,color: 'rgba(108, 134, 161,1)',marginTop: 10},
    SecHeaderCon: { alignSelf: 'center', width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },  
    sectiolListStyle: { zIndex: 5, width: '100%', height: '100%' },  
    cardContainer: { width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingInline: 16, paddingVertical: 5, backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3, marginVertical: 8, marginHorizontal: 16 },  
    title: { fontSize: 18, fontWeight: 'bold', color: '#333' },  
    subtitle: { fontSize: 12, color: '#666', marginTop: 0 },  
    priceContainer: { width: 50, height: 50, backgroundColor: '#1E90FF', borderRadius: 50, padding: 5, justifyContent: 'center', alignItems: 'center' },  
    priceText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },  
    listContent: { paddingVertical: 8 },
});

export default SectionListDisplay;