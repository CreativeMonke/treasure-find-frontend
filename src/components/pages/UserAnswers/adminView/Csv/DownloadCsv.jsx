import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CSVLink } from 'react-csv';
import Button from '@mui/joy/Button';
import { getAllAnswersForCSV } from '../../../../../features/answers/answerSlice';
import { Box } from '@mui/joy';

const DownloadCSVButton = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const csvLinkRef = useRef(null);

    const handleDownload = async () => {
        setLoading(true);
        try {
            let fetchedData = await dispatch(getAllAnswersForCSV()).unwrap();
            console.log(fetchedData);
            setData(fetchedData);
            setTimeout(() => {
                csvLinkRef.current.link.click();
            }, 0);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.toString());
        }
        setLoading(false);
    };

    // Ensure the CSVLink is always in the DOM
    useEffect(() => {
        setData([]); // Initialize with an empty array
    }, []);

    return (
        <Box sx = {{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}> 
            <Button onClick={handleDownload} disabled={loading} variant="solid" size="lg">
                {loading ? "Se încarcă..." : "Descarcă CSV"}
            </Button>
            {error && <p>Eroare: {error}</p>}
            {/* Render CSVLink invisibly with conditional data */}
            <CSVLink
                data={data}
                filename="raspunsuriTreasureHunt.csv"
                className="hidden" // Ensure it's hidden
                style={{ display: 'none' }} // Use inline style to hide
                ref={csvLinkRef}
                target="_blank"
            />
        </Box>
    );
};

export default DownloadCSVButton;
