### Getting Data
To get data from the database make a GET request to 
https://line-drive-betting.appspot.com/<COLLECTION>/<DATATYPE>/<TEAMA>/<TEAMB>
https://line-drive-betting.appspot.com/<COLLECTION>/<DATATYPE>/<TEAMA>/<TEAMB>/<SINCE>
<COLLECTION> is the collection to access (Matchup for match data)
<DATATYPE> is the datatype you want to access (ex. overUnder)
<TEAMx> is the teams involed (order doesn't matter)
<SINCE> is optional and allows you to specify a start point for data formated as the time from epoch in milliseconds (use ```new Date().getTime()```)

### Adding Data
To add data to the database just make a POST request to https://line-drive-betting.appspot.com/<COLLECTION>
Where <COLLECTION> will be the collection you want to access
For adding team match up data please use the "Matchup" collection
The format for payloads to the Database are formatted as such:

```json
{
    Teams: ["<TEAMA>", "<TEAMB>"],
    DataType: "<TYPE OF DATA>",
    Value: <VALUE OF DATA>
}
```

the server will add the correct time for the entry so just add them in chronological order.
