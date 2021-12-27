import * as Style from "./style.js";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function TransferButton() {
    return (
        <Style.boxArea>
            <Card>
                <h2>ETH MTC Balance </h2>
                <CardContent>

                    <TextField></TextField>
                    <Button variant="contained">Transfer</Button>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                <h2>BSC MTC Balance </h2>
                    <TextField></TextField>
                    <Button variant="contained">Transfer</Button>
                </CardContent>
            </Card>
        </Style.boxArea>

    )
}