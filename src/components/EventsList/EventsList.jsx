import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';









const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));






export default function EventsList(props) {

    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">

                <TableHead>
                    <TableRow>
                        <TableCell>Events</TableCell>
                        <TableCell align="right">Dates&nbsp;</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.events.map((event) => (
                        <TableRow
                            key={event._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={`/events/${event._id}`}>
                                    {event.name}
                                </Link>

                            </TableCell>
                            <TableCell align="right">{event.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}