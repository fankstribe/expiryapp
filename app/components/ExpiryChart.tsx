import {ScrollView, Dimensions, Text, View} from 'react-native'
import React, {useMemo} from 'react'
import {Expiry, ExpiryStatus} from "@/src/types";
import {BarChart} from "react-native-chart-kit";

interface ExpiryChartProps {
    expiries: Expiry[];
}

const ExpiryChart: React.FC<ExpiryChartProps> = ({ expiries = [] }) => {

    const chartData = useMemo(() => {
        const data: { [key: string]: number } = {};

        const upcomingExpiries = expiries.filter(e => e.status !== ExpiryStatus.Paid);

        upcomingExpiries.forEach(e => {
            const month = new Date(e.dueDate).toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
            if (!data[month]) data[month] = 0;
            data[month] += Number(e.amount) || 0;
        });

        // @ts-ignore
        const sortedMonths = Object.keys(data).sort((a, b) => {
            const [monthA, yearA] = a.split(' ');
            const [monthB, yearB] = b.split(' ');
            const monthMap: Record<string, number> = {
                'gen': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'mag': 4, 'giu': 5,
                'lug': 6, 'ago': 7, 'set': 8, 'ott': 9, 'nov': 10, 'dic': 11
            };
            const dateA = new Date(parseInt(yearA, 10)+2000, monthMap[monthA.replace('.','')]);
            const dateB = new Date(parseInt(yearB, 10)+2000, monthMap[monthB.replace('.','')]);
            return dateA.getTime() - dateB.getTime();
        });

        return {
            labels: sortedMonths,
            datasets: [
                {
                    data: sortedMonths.map(month => data[month]),
                }
            ]
        };
    }, [expiries]);

    const screenWidth = Dimensions.get('window').width - 40;

    // @ts-ignore
    return (
        <View className="bg-white p-5 rounded-lg border border-slate-200 mb-4 overflow-hidden">
            <Text className="text-xl font-poppins-semibold mb-4 text-sky-600">
                Scadenze Mensili in Arrivo
            </Text>
            {chartData.labels.length > 0 ? (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 20 }}
                >
                    <BarChart
                        data={chartData}
                        width={screenWidth}
                        height={220}
                        yAxisLabel="€"
                        yAxisSuffix=""
                        showValuesOnTopOfBars
                        withInnerLines={false}
                        yAxisInterval={1}
                        fromZero
                        chartConfig={{
                            backgroundGradientFrom:'#ffffff',
                            backgroundGradientTo:'#ffffff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(14, 165, 233, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
                            style: { borderRadius: 8 },
                            propsForDots: { r: '6', strokeWidth: '2', stroke: '#0ea5e9' },
                        }}
                        style={{
                            borderRadius: 8,
                            marginLeft: -8,
                            marginRight: -8,
                        }}

                    />
                </ScrollView>
            ) : (
                <View className="h-[220px] justify-center items-center">
                    <Text className="sans text-slate-500">Nessuna scadenza in arrivo da visualizzre.</Text>
                </View>
            )}
        </View>
    )
}
export default ExpiryChart
