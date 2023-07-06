import React, { useState } from 'react';
//Bachelor of Veterinary Science and Animal Husbandry (B.V.Sc & AH):
//Master of Veterinary Science (M.V.Sc):
//Doctor of Veterinary Medicine (D.V.M):
//Ph.D. in Veterinary Science
const FarmerVetListPage = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [vets, setVets] = useState([]);

  const areas = ['Chikkadpally', 'Himayathnagar','Abids', 'Lakdikapul', 'Secunderabad', 'Kondapur', 'Miyapur', 'Madhapur', 'Manikonda', 'Gachibowli', 'Nizampet', 'JNTUH', 'Erragadda', 'Ameerpet'].sort();

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    const fetchedVets = getVetsByArea(e.target.value);
    setVets(fetchedVets);
  };

  // Simulated vet data for each area
  const getVetsByArea = (area) => {
    switch (area) {
      case 'Chikkadpally':
        return [
          {
            name: 'Dr.Shruti',
            qualification: 'B.V.Sc & AH',
            phoneNumber: '6303402138',
            address: 'My pet Clinic,street number 6,Chikkadpally',
            timings: '9:00 AM - 5:00 PM',
          },
          {
            name: 'Dr.Rohit sharma',
            qualification: 'B.V.SC & AH,M.V.Sc',
            phoneNumber: '6304184445',
            address: 'Animal Wellness Clinic,Street number 12,Chikkadpally',
            timings: '10:00 AM - 3:00 PM',
          },
          {
            name: 'Dr.Kiran kumar',
            qualification: 'B.V.SC & AH,',
            phoneNumber: '6378967445',
            address: 'Kiran Clinic,Street number 24,Chikadpally',
            timings: '10:00 AM - 6:00 PM',
          },
        ];
      case 'Himayathnagar':
        return [
          {
            name: 'Dr.Virat Singh',
            qualification: 'B.V.SC & AH,M.V.Sc,D.V.M',
            phoneNumber: '6303402138',
            address: 'Harmony Veterinary Care,beside D-mart,Himayathnagar',
            timings: '8:00 AM - 4:00 PM',
          },
          {
            name: 'Dr.leela',
            qualification: 'B.V.SC & AH',
            phoneNumber: '9803402138',
            address: 'Pet Health Partners,street number 7,Himayathnagar',
            timings: '12:00 PM - 4:00 PM',
          },
        ];
      case 'Abids':
        return [
          {
            name: 'Dr.Ramesh babu',
            qualification: 'B.V.SC & AH,M.V.Sc,D.V.M,Ph.D. in Veterinary Science',
            phoneNumber: '9849386188',
            address: 'Apple pet Clinic,street number 9,beside CMR Mall,Abids',
            timings: '11:00 AM - 7:00 PM',
          },
          {
            name: 'Dr.Jyothi',
            qualification: 'B.V.SC & AH,M.V.Sc',
            phoneNumber: '6303402138',
            address: 'Gentle Paws Veterinary Clinic,street number 15,Abids',
            timings: '10:00 AM - 6:00 PM',
          },
        ];
        case 'Lakdikapul':
        return [
          {
            name: 'Dr.Rajiv Mehta',
            qualification: 'B.V.SC & AH,M.V.Sc,D.V.M',
            phoneNumber: '7848387188',
            address: 'Pet Welness Clinic,street number 14,beside yashoda theatre,Lakdikapul',
            timings: '11:00 AM - 7:00 PM',
          },
          {
            name: 'Dr.Aniket Joshi',
            qualification: 'B.V.SC',
            phoneNumber: '9303402138',
            address: 'Pet Heaven Veterinary Clinic,street number 15,Lakdikapul',
            timings: '10:00 AM - 6:00 PM',
          },
          {
            name: 'Dr.Sanya Reddy',
            qualification: 'B.V.SC & AH,M.V.Sc',
            phoneNumber: '8308902138',
            address: ' Compassionate Vet Care ,street number 15,Lakdikapul',
            timings: '10:00 AM - 8:00 PM',
          },
        ];
        case 'Kondapur':
            return [
              {
                name: 'Dr.Arjun reddy',
                qualification: 'B.V.SC & AH,M.V.Sc,D.V.M',
                phoneNumber: '6848387188',
                address: ' Purrfect Pet Clinic,street number 14,beside Metro Station,Kondapur',
                timings: '11:00 AM - 7:00 PM',
              },
              {
                name: 'Dr.Murthi',
                qualification: 'B.V.SC',
                phoneNumber: '9303402133',
                address: ' Happy Tails Pet Clinic,street number 2,beside More super market,Kondapur',
                timings: '10:00 AM - 6:00 PM',
              },
              {
                name: 'Dr.Preeti gupta',
                qualification: 'B.V.SC & AH,M.V.Sc,D.V.M,PHD',
                phoneNumber: '8308902141',
                address: '  Tender Paws Veterinary Clinic,street number 5,Kondapur',
                timings: '11:45 AM - 8:30 PM',
              },
            ];
            case 'Miyapur':
                return [
                  {
                    name: 'Dr.Kapil',
                    qualification: 'B.V.SC & AH,M.V.Sc',
                    phoneNumber: '7848387178',
                    address: ' Gentle Care Pet Clinic,street number 14,above Reliance store,Miyapur',
                    timings: '12:00 pM - 9:00 PM',
                  },
                  {
                    name: 'Dr.Vinay goud',
                    qualification: 'B.V.SC',
                    phoneNumber: '83089021381',
                    address: ' Harmony Animal Hospital,street number 2,Opposite Narayana college,Miyapur',
                    timings: '09:00 AM - 3:00 PM',
                  },
                  {
                    name: 'Dr.Lily',
                    qualification: 'B.V.SC',
                    phoneNumber: '9308502177',
                    address: ' Loving Paws Veterinary Care,street number 15,Miyapur',
                    timings: '10:45 AM - 9:30 PM',
                  },
                ];
                case 'Secunderabad':
                return [
                  {
                    name: 'Dr.Keerti Siri',
                    qualification: 'B.V.SC & AH,M.V.Sc',
                    phoneNumber: '7848387178',
                    address: ' Siri Pet Clinic,street number 1,opposite Wesely Church,Secunderabad',
                    timings: '12:00 pM - 9:00 PM',
                  },
                  {
                    name: 'Dr.Venu',
                    qualification: 'B.V.SC & AH',
                    phoneNumber: '8389021381',
                    address: 'My Animal Hospital,street number 17,Opposite Railway station,Secunderabad',
                    timings: '09:00 AM - 3:00 PM',
                  },
                  {
                    name: 'Dr.Chandrika',
                    qualification: 'B.V.SC',
                    phoneNumber: '9308502177',
                    address: ' Lovely  Veterinary Care,street number 15,Secunderabad',
                    timings: '10:45 AM - 9:30 PM',
                  },
                ];
                  case 'Madhapur':
                return [
                  {
                    name: 'Dr.Pragathi',
                    qualification: 'B.V.SC & AH,M.V.Sc,D.V.M',
                    phoneNumber: '6956948712',
                    address: 'Pet Oasis Veterinary Hospital,street number 5,Behind Shanti theatre,Madhapur',
                    timings: '12:30 PM - 10:00 PM',
                  },
                  {
                    name: 'Dr.kiran reddy',
                    qualification: 'B.V.SC & AH',
                    phoneNumber: '7259021756',
                    address: ' Caring Hands Animal Clinic,street number 12,Opposite Malabar jewellers,Madhapur',
                    timings: '8:00 AM - 4:30 PM',
                  },
                ];
                case 'Manikonda':
                    return [
                      {
                        name: 'Dr.Rahul ',
                        qualification: 'B.V.SC & AH,M.V.Sc,D.V.M',
                        phoneNumber: '6304342135',
                        address: ' PetVet Clinic,beside MAX,Manikonda',
                        timings: '12:00 PM - 6:00 PM',
                      },
                      {
                        name: 'Dr.Nikhil sharma',
                        qualification: 'B.V.SC & AH',
                        phoneNumber: '7785881344',
                        address: 'Paws and More Pet Clinic,Opposite metro station,Manikonda',
                        timings: '09:00 AM - 4:30 PM',
                      },
                      {
                        name: 'Dr.priyanka',
                        qualification: 'B.V.SC',
                        phoneNumber: '9308502459',
                        address: ' Priyanka  Veterinary Care,street number 15,Manikonda',
                        timings: '10:45 AM - 9:30 PM',
                      },
                    ];
                    case 'Gachibowli':
                    return [
                      {
                        name: 'Dr.shilpa ',
                        qualification: 'B.V.SC & AH,M.V.Sc',
                        phoneNumber: '9304342181',
                        address: ' Iconic Vet Clinic,beside My home apartments,Gachibowli',
                        timings: '11:00 AM - 6:00 PM',
                      },
                      {
                        name: 'Dr.pranathi',
                        qualification: 'B.V.SC & AH',
                        phoneNumber: '6785881311',
                        address: 'Top Pet Clinic,Beside IKEA,Gachibowli',
                        timings: '09:00 AM - 4:30 PM',
                      },
                      {
                        name: 'Dr.priya',
                        qualification: 'B.V.SC',
                        phoneNumber: '8308502456',
                        address: ' Priya Veterinary Care,street number 15,Gachibowli',
                        timings: '10:45 AM - 9:30 PM',
                      },
                    ];
                    case 'Nizampet':
                    return [
                      {
                        name: 'Dr.Nikhitha ',
                        qualification: 'B.V.SC & AH,M.V.Sc',
                        phoneNumber: '6304345174',
                        address: ' Bulletproof Vet Clinic,above Vijetha supermarket,Nizampet',
                        timings: '11:00 AM - 6:00 PM',
                      },
                      {
                        name: 'Dr.Nikhila',
                        qualification: 'B.V.SC & AH',
                        phoneNumber: '8525881341',
                        address: 'Cloud vet Hospital,Beside Vegetable market,Nizampet',
                        timings: '1:00 AM - 4:30 PM',
                      },
                      {
                        name: 'Dr.Sahiti',
                        qualification: 'B.V.SC & M.V.Sc',
                        phoneNumber: '9444502456',
                        address: ' Shine  Veterinary ,street number 15,Nizampet',
                        timings: '10:45 AM - 7:30 PM',
                      },
                    ];
        case 'JNTUH':
        return [
          {
            name: 'Dr.Harshini',
            qualification: 'B.V.Sc & AH,M.V.Sc,D.V.M,PHD',
            phoneNumber: '7402402138',
            address: 'Vijay Vet Clinic,street number 6,JNTUH',
            timings: '11:00 AM - 3:30 PM',
          },
          {
            name: 'Dr.Vinay reddy',
            qualification: 'B.V.SC & AH,M.V.Sc',
            phoneNumber: '8224145615',
            address: 'Animal Wellness Clinic,Street number 12,JNTUH',
            timings: '10:00 AM - 7:00 PM',
          },
          {
            name: 'Dr.Karthik kumar',
            qualification: 'B.V.SC & AH,',
            phoneNumber: '85389674545',
            address: 'Sri Sai Clinic,Street number 24,JNTUH',
            timings: '10:00 AM - 6:00 PM',
          },
        ];
        case 'Erragadda':
        return [
          {
            name: 'Dr.Tejaswi',
            qualification: 'B.V.Sc & AH,M.V.Sc,D.V.M,PHD',
            phoneNumber: '9405552138',
            address: 'Teju Vet Clinic,street number 6,Erragadda',
            timings: '11:00 AM - 3:30 PM',
          },
          {
            name: 'Dr.Laya reddy',
            qualification: 'B.V.SC & AH,M.V.Sc',
            phoneNumber: '8224145615',
            address: 'Animal Wellness Clinic,Street number 9,Erragadda',
            timings: '10:00 AM - 7:00 PM',
          },
          {
            name: 'Dr.Roshan',
            qualification: 'B.V.SC & AH,M.V.Sc',
            phoneNumber: '95389674545',
            address: 'Pawesome Clinic,Street number 12,Erragadda',
            timings: '10:00 AM - 6:00 PM',
          },
        ];
        case 'Ameerpet':
        return [
          {
            name: 'Dr.Hafsa',
            qualification: 'B.V.Sc & AH,M.V.Sc,D.V.M,PHD',
            phoneNumber: '7851552141',
            address: 'Star Vet Clinic,street number 6,Ameerpet',
            timings: '9:00 AM - 3:30 PM',
          },
          {
            name: 'Dr.Rohith',
            qualification: 'B.V.SC & AH,M.V.Sc',
            phoneNumber: '9451145622',
            address: 'Care Pet Clinic,Street number 9,Ameerpet',
            timings: '10:30 AM - 7:00 PM',
          },
          {
            name: 'Dr.Zayn malik',
            qualification: 'B.V.SC & AH,M.V.Sc',
            phoneNumber: '75189674985',
            address: 'Mimi Clinic,Street number 12,Ameerpet',
            timings: '10:00 AM - 6:00 PM',
          },
        ];
      default:
        return [];
    }
  };
  
  return (
    <div className="text-center">
      <label htmlFor="area" style={{ fontSize: '24px' }}>Select Area:</label>
      <select id="area" value={selectedArea} onChange={handleAreaChange} style={{ height: '40px' }}>
        <option value="">Select an area</option>
        {areas.map((area, index) => (
          <option key={index} value={area} style={{ fontSize: '18px' }}>
            {area}
          </option>
        ))}
      </select>

      {selectedArea && (
        <p style={{ marginTop: '25px' ,fontSize: '20px' }}>Your selected area is: {selectedArea}</p>
      )}

      {vets.length > 0 && (
        <table className="table table-bordered mt-4" style={{ width: '100%', borderCollapse: 'collapse',borderColor: 'dark' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qualification</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Timings</th>
            </tr>
          </thead>
          <tbody>
            {vets.map((vet, index) => (
              <tr key={index}>
                <td>{vet.name}</td>
                <td>{vet.qualification}</td>
                <td>{vet.phoneNumber}</td>
                <td>{vet.address}</td>
                <td>{vet.timings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FarmerVetListPage;