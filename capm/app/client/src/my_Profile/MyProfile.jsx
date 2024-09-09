import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  FlexBox,
  Label,
  Text,
  ThemeProvider,
} from "@ui5/webcomponents-react";
import "./myProfile.css"; // Assuming you have some CSS for styling

/**
 * Profile Page Component
 * @returns Profile Page
 */
const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    title: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PREFIX}service/timesheet/SSIUserDetails`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        // Assuming response.data.value is an array with one object
        const userData = response.data.value[0];

        setUserDetails({
          name: userData.PersonName,
          email: userData.EmailId,
          title: userData.Title,
        });
      } catch (error) {
        setError("Failed to fetch user details. Please try again.");
      }
    };

    fetchUserDetails();
  }, []);

  // Array of profile details
  const profileDetails = [
    { label: "Name", value: userDetails.name },
    { label: "Email", value: userDetails.email },
    { label: "Title", value: userDetails.title },
  ];

  return (
    <div className="Profile-MainContainer">
        <Card className="Profile-DataCard">

          <FlexBox id="idProfileContentsFlexBox" className="Profile-ContentFlexBox" direction="Column">

            <FlexBox id="idCardHeaderFlexBox" className="CardHeaderFlexBox" width="100%" justifyContent="Center">
              <CardHeader titleText="Profile" />
            </FlexBox>

            <FlexBox id="idProfileDataFlexBox" className="Profile-Data" direction="Column" justifyContent="Center" alignItems="Start">
              {error && <div className="error-message">{error}</div>}
              {profileDetails.map((detail, index) => (
                <FlexBox id="idLabelDataFlexBox" direction="Row" className="LabelDataFlexBox">

                    <FlexBox id="idLabelFlexBox" direction="Column" className="LabelFlexBox">
                        <Label id="idLabel">{detail.label} </Label>
                    </FlexBox>

                    <FlexBox id="idData" direction="Column" className="TextFlexBox">
                        <ThemeProvider id="idMyProfileThemeProvider">
                          <Text id="idMyProfileText">{detail.value}</Text>
                        </ThemeProvider>
                    </FlexBox>

                </FlexBox>
              ))}
            </FlexBox>

          </FlexBox>

        </Card>
    </div>
  );
};

export default Profile;
