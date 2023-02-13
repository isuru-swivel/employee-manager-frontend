import React, { useState } from "react";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import EmployeeGridView from "components/EmployeeGridView";
import EmployeeListView from "components/EmployeeListView";

enum ViewTypes {
  LIST_VIEW = "LIST_VIEW",
  GRID_VIEW = "GRID_VIEW",
}

const Home = () => {
  const [viewType, setViewType] = useState<ViewTypes>(ViewTypes.GRID_VIEW);

  const handleViewTypeChange = () => {
    if (viewType === ViewTypes.GRID_VIEW) {
      setViewType(ViewTypes.LIST_VIEW);
    } else {
      setViewType(ViewTypes.GRID_VIEW);
    }
  };

  const data = [
    {
      first_name: "Henri",
      last_name: "Rodriguez",
      email: "Darrin_Rippin@gmail.com",
      number: "+94771277218",
      gender: "M",
      id: "1",
      photo: "https://randomuser.me/api/portraits/men/92.jpg",
    },
    {
      first_name: "Lindsay",
      last_name: "Herman",
      email: "Ewald.Kunde@gmail.com",
      number: "+94771274218",
      gender: "F",
      id: "2",
      photo: "https://randomuser.me/api/portraits/men/30.jpg",
    },
    {
      first_name: "Gerda",
      last_name: "Trantow",
      email: "Mauricio.Stehr@yahoo.com",
      number: "+94771277681",
      gender: "M",
      id: "3",
      photo: "https://randomuser.me/api/portraits/men/85.jpg",
    },
    {
      first_name: "Skye",
      last_name: "Rolfson",
      email: "Angelita_Simonis@hotmail.com",
      number: "+94771277689",
      gender: "F",
      id: "4",
      photo: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      first_name: "Simeon",
      last_name: "Russel",
      email: "Fabiola_Heidenreich@yahoo.com",
      number: "+94771277682",
      gender: "M",
      id: "5",
      photo: "https://randomuser.me/api/portraits/men/81.jpg",
    },
    {
      first_name: "Kenyon",
      last_name: "Fahey",
      email: "Lia_Purdy@hotmail.com",
      number: "+94771277683",
      gender: "F",
      id: "6",
      photo: "https://randomuser.me/api/portraits/men/31.jpg",
    },
    {
      first_name: "Toni",
      last_name: "Boyle",
      email: "Vivien92@yahoo.com",
      number: "+94771277684",
      gender: "M",
      id: "7",
      photo: "https://randomuser.me/api/portraits/men/88.jpg",
    },
    {
      first_name: "Fredy",
      last_name: "Fritsch",
      email: "Christopher_Wisozk37@yahoo.com",
      number: "+94771277685",
      gender: "M",
      id: "8",
      photo: "https://randomuser.me/api/portraits/men/61.jpg",
    },
    {
      first_name: "Elvis",
      last_name: "Konopelski",
      email: "Mavis27@gmail.com",
      number: "+94771277686",
      gender: "M",
      id: "9",
      photo: "https://randomuser.me/api/portraits/men/66.jpg",
    },
    {
      first_name: "Lulu",
      last_name: "Reinger",
      email: "Melany_Rau70@gmail.com",
      number: "+94771277687",
      gender: "F",
      id: "10",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      first_name: "Kelton",
      last_name: "Rau",
      email: "Patrick_Ratke@gmail.com",
      number: "+94771277688",
      gender: "F",
      id: "11",
      photo: "https://randomuser.me/api/portraits/men/71.jpg",
    },
    {
      first_name: "Adonis",
      last_name: "Schuppe",
      email: "Johann.Orn52@hotmail.com",
      number: "+94771277618",
      gender: "M",
      id: "12",
      photo: "https://randomuser.me/api/portraits/men/36.jpg",
    },
  ];

  return (
    <React.Fragment>
      <div className="d-flex justify-content-end my-4">
        <IconButton onClick={handleViewTypeChange} className="me-3">
          {viewType === ViewTypes.GRID_VIEW ? (
            <GridViewIcon />
          ) : (
            <FormatListBulletedIcon />
          )}
        </IconButton>
        <Link href="/add">
          <Button variant="contained">Add Employee</Button>
        </Link>
      </div>
      {viewType === ViewTypes.GRID_VIEW ? (
        <EmployeeGridView employees={data} />
      ) : (
        <EmployeeListView employees={data} />
      )}
    </React.Fragment>
  );
};

export default Home;
