import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Card, CardBody, SimpleGrid } from '@chakra-ui/react';

export default function Stats() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        responsive: true,
        width: "100%",
        plugins: {
            legend: {
                display: false
            },
        }
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [11, 43, 24, 52, 13, 5, 34, 23, 7, 12, 23, 5],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Box maxW={"100%"} mt={8}>
            <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 2, xl: 2 }} spacing={3}>
                <Card variant={"filled"}>
                    <CardBody>
                        <Line options={options} data={data} />
                    </CardBody>
                </Card>
                <Card variant={"filled"}>
                    <CardBody>
                        <Line options={options} data={data} />
                    </CardBody>
                </Card>
            </SimpleGrid>
        </Box>
    )
}
