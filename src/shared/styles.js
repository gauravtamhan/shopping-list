import { StyleSheet } from 'react-native'
import { NAV_COLOR, TITLE_COLOR, SUBTEXT_COLOR } from '@theme/colors';

const styles = StyleSheet.create({
    /*=============================================================
                   Components - CSS Styles
    ==============================================================*/
    
    // Header Navigation Button
    headerButtonContainer: {
        marginHorizontal: 18,
    },
    headerButton: {
        fontSize: 17,
        color: NAV_COLOR,
    },
    headerButtonIcon: {
        color: NAV_COLOR,
    },

    // List Header
    listHeaderContainer: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 4,
        backgroundColor: 'rgba(255,255,255,0.98)',
    },
    listHeader: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.7)',
    },

    // Main List Row
    listRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 10,
        backgroundColor: 'transparent',
    },
    rowMainText: {
        fontSize: 17,
        fontWeight: '600',
    },
    rowSubText: {
        fontSize: 14,
        fontWeight: '400',
        color: SUBTEXT_COLOR,
    },
    rightChevron: {
        marginLeft: 10,
        color: SUBTEXT_COLOR,
        opacity: 0.75,
    },
    separator: {
        height: 0.5,
        // backgroundColor: 'rgba(0,0,0,0.15)',
        backgroundColor: 'rgb(194,193,196)', // 231,230,233
        marginLeft: 18,
    },

    /*=============================================================
                   Scenes - Shared CSS Styles
    ==============================================================*/
    
    // Page Container
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    
    /*------------------------
        Shopping List Scene
     ------------------------*/
    title: {
        paddingHorizontal: 18, 
        marginTop: 4, 
        marginBottom: 12,
        fontSize: 30, 
        fontWeight: "700",
        color: TITLE_COLOR
    },
    itemRow: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.16)',
    },
    itemName: {
        fontSize: 17,
    },
    itemDesc: {
        fontSize: 13,
        color: 'rgba(0,0,0,0.6)',
        marginTop: 5,
    },
    itemRightTextContainer: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '18%',
    },
    itemRightTextMain: {
        fontSize: 20, 
        color: 'rgba(0,0,0,0.7)', 
        fontWeight: '700',
    },
    itemRightTextSub: {
        fontSize: 15, 
        color: 'rgba(0,0,0,0.7)',
    },

    /*------------------------
        Add Item Modal
     ------------------------*/
    textInputWrapper: {
        borderBottomWidth: 0.6,
        borderBottomColor: 'rgba(0,0,0,0.4)',
        marginTop: 30,
        paddingHorizontal: 4,
        marginHorizontal: 18,
    },
    selectInputWrapper: {
        borderTopWidth: 0.6,
        borderBottomWidth: 0.6,
        borderColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 4,
        marginHorizontal: 18,
    },
     basicInputField: { 
        paddingVertical: 5, 
        fontSize: 17, 
    },
    sliderWrapper: { 
        flexDirection: 'row',
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    sliderPill: {
        marginHorizontal: 6,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: 'rgb(248,248,252)'
    },
    sliderPillSelected: {
        backgroundColor: NAV_COLOR,
    },
    sliderPillText: {
        color: NAV_COLOR,
        fontWeight: '600',
        fontSize: 15,
    },
    sliderPillTextSelected: {
        color: '#fff',
    }

})

export default styles