# Nations Api 🛫

#### An API to get list of Countries, States for a country, Cities for a State.

## Open Endpoints

### To get the list of Countries

**URL**: `/getCountries`

#### Success Response

**Code**: `200 OK`

**Response**:

```
{
    "status": 200,
    "message": "Countries fetched successfully",
    "data": {
        countries: [
            ...
            {
                "id": 1,
                "name": "Afghanistan",
                "capital": "Kabul",
                "currency": "AFN",
                "phone_code": "93",
                "iso2": "AF",
                "iso3": "AFG"
            }
            ...
        ]
    }
}
```

#### Error Response

**Code** : `200 Ok`

**Response**

```json
null
```

### To get the list of States for a Country

**URL**: `/getStatesForCountry/<Country Name>`

**Parameter**:

-    Country Name (Url Encoded)

#### Success Response

**Code**: `200 OK`

**Response**:

```
{
    status: 200,
    "message": "States fetched successfully",
    "data": {
        states: [
            ...
            {
                "id": 1259,
                "name": "Bamingui-Bangoran Prefecture",
                "state_code": "BB"
            },
            ...
        ]
    }
}
```

#### Error Response

**Condition** : If country name is invalid.

**Code** : `200 OK`

**Response**

```
{
    "status": 400,
    "data": null,
    "message": "Could not get states for this country"
}
```

### To get the list of Cities for a State

**URL**: `getCitiesForState/<Country Name>/<State Id>`

**Parameters**:

-    Country Name (Url Encoded)
-    State Id (Url Encoded)

#### Success Response

**Code**: `200 OK`

**Response**:

```
{
    "status": 200,
    "data": {
        "cities": [
            ...
            {
                "id": 52,
                "name": "Ashkāsham",
                "latitude": "36.68333000",
                "longitude": "71.53333000"
            },
            ...
        ]
    },
    "message": "Cities fetched successfully"
}
```

#### Error Response

**Condition** : If country name or state id is invalid.

**Code** : `200 OK`

**Response**

```
{
    "status": 400,
    "data": null,
    "message": "Could not get cities for this state"
}
```

### License

```
MIT
```
