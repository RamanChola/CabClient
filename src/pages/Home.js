import React, { useState } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import PeopleCardFooter from "@mui-treasury/components/cardFooter/people";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { Button, TextField, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import { Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoTitle, InfoSubtitle } from "@mui-treasury/components/info";
import { useTutorInfoStyles } from "@mui-treasury/styles/info/tutor";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";
import firebase from "firebase";
import app from "../util/base";
import { useHistory } from "react-router";

const useStyles = makeStyles(() => ({
  root: {
    margin: "auto",
    minWidth: "400px",
    position: "absolute",
    left: "300px",
    top: "100px",
    "@media (max-width: 600px)": {
      left: "20px",
      minWidth: "250px",
    },
  },
  content: {
    padding: 24,
  },
  action: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
}));

const Home = () => {
  const user = firebase.auth().currentUser;
  console.log(user);
  let history = useHistory();
  const [pickupLocation, setPickupLocation] = useState();
  const [dropLocation, setDropLocation] = useState();
  const [isSelected, setIsSelected] = useState();
  const [isSedanSelected, setSedanIsSelected] = useState();
  const [isAutoSelected, setAutoIsSelected] = useState();
  const cardStyles = useStyles();
  const wideCardMediaStyles = useWideCardMediaStyles();
  const fadeShadowStyles = useFadedShadowStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });
  const avatarStyles = useDynamicAvatarStyles({ radius: 12, size: 48 });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { pickup, drop } = e.target.elements;
    setPickupLocation(pickup.value);
    setDropLocation(drop.value);
  };

  const handleClick = () => {
    setIsSelected(true);
    if (isSedanSelected) {
      setSedanIsSelected(false);
    }
    if (isAutoSelected) {
      setAutoIsSelected(false);
    }
  };

  const handleSedanClick = () => {
    setSedanIsSelected(true);
    if (isSelected) {
      setIsSelected(false);
    }
    if (isAutoSelected) {
      setAutoIsSelected(false);
    }
  };
  const handleAutoClick = () => {
    setAutoIsSelected(true);
    if (isSelected) {
      setIsSelected(false);
    }
    if (isSedanSelected) {
      setSedanIsSelected(false);
    }
  };

  const handlePayment = () => {
    console.log(user.uid);
    const tripStatusRef = firebase.database().ref(`rides/${user.uid}/tripStatus`);
    const status = {
      status: "isSearching",
    };
    tripStatusRef
      .push(status)
      .then((e) => {
        // Update successful
        // ...
        history.push(`/ride/${e.path.pieces_[3]}`);
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
  };

  return (
    <>
      <Card className={cx(cardStyles.root, fadeShadowStyles.root)}>
        <CardContent className={cardStyles.content}>
          <TextInfoContent
            classes={textCardContentStyles}
            heading={
              <Typography component={"span"} variant={"body1"}>
                Book a Ride
              </Typography>
            }
          />
          {!pickupLocation ? (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flexStart",
                justifyContent: "center",
              }}
            >
              <TextField
                name="pickup"
                label="pickup location"
                type="text"
                placeholder="pickup location"
                style={{ margin: "10px" }}
                required
              />
              <TextField
                name="drop"
                label="drop location"
                type="text"
                placeholder="drop location"
                style={{ margin: "10px" }}
                required
              />

              <Button
                variant="contained"
                type="submit"
                style={{
                  margin: "10px",
                  backgroundColor: "#000",
                  color: "#fff",
                }}
              >
                Go
              </Button>
            </form>
          ) : (
            <>
              <Row
                p={1.5}
                gap={2}
                bgcolor={!isSelected ? "#f5f5f5" : "#000"}
                onClick={handleClick}
              >
                <Item>
                  <Avatar
                    classes={avatarStyles}
                    src={
                      "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberGo_v1.png"
                    }
                  />
                </Item>
                <Info position={"middle"} useStyles={useTutorInfoStyles}>
                  <InfoTitle style={{ color: !isSelected ? "#000" : "#fff" }}>
                    UberGo
                  </InfoTitle>
                  <InfoSubtitle
                    style={{ color: !isSelected ? "#000" : "#fff" }}
                  >
                    Affordable, compact rides
                  </InfoSubtitle>
                  <InfoSubtitle
                    style={{ color: !isSelected ? "#000" : "#fff" }}
                  >
                    In 3 mins. 01:43 am dropoff
                  </InfoSubtitle>
                </Info>
                <Item
                  style={{ color: !isSelected ? "#000" : "#fff" }}
                  ml={1}
                  position={"middle"}
                >
                  ₹198.89
                </Item>
              </Row>
              <Row
                onClick={handleSedanClick}
                p={1.5}
                mt={2}
                gap={2}
                bgcolor={!isSedanSelected ? "#f5f5f5" : "#000"}
              >
                <Item>
                  <Avatar
                    classes={avatarStyles}
                    src={
                      "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Select_v1.png"
                    }
                  />
                </Item>
                <Info position={"middle"} useStyles={useTutorInfoStyles}>
                  <InfoTitle
                    style={{ color: !isSedanSelected ? "#000" : "#fff" }}
                  >
                    Go Sedan
                  </InfoTitle>
                  <InfoSubtitle
                    style={{ color: !isSedanSelected ? "#000" : "#fff" }}
                  >
                    Affordable rides in a sedan
                  </InfoSubtitle>
                  <InfoSubtitle
                    style={{ color: !isSedanSelected ? "#000" : "#fff" }}
                  >
                    In 2 mins. 01:42 am dropoff
                  </InfoSubtitle>
                </Info>
                <Item
                  style={{ color: !isSedanSelected ? "#000" : "#fff" }}
                  ml={1.2}
                  position={"middle"}
                >
                  ₹217.26
                </Item>
              </Row>
              <Row
                onClick={handleAutoClick}
                p={1.5}
                mt={2}
                gap={2}
                bgcolor={!isAutoSelected ? "#f5f5f5" : "#000"}
              >
                <Item>
                  <Avatar
                    classes={avatarStyles}
                    src={
                      "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png"
                    }
                  />
                </Item>
                <Info position={"middle"} useStyles={useTutorInfoStyles}>
                  <InfoTitle
                    style={{ color: !isAutoSelected ? "#000" : "#fff" }}
                  >
                    UberAuto
                  </InfoTitle>
                  <InfoSubtitle
                    style={{ color: !isAutoSelected ? "#000" : "#fff" }}
                  >
                    No bargaining, doorstep pick
                  </InfoSubtitle>
                  <InfoSubtitle
                    style={{ color: !isAutoSelected ? "#000" : "#fff" }}
                  >
                    In 4 mins. 01:45 am dropoff
                  </InfoSubtitle>
                </Info>
                <Item
                  style={{ color: !isAutoSelected ? "#000" : "#fff" }}
                  ml={0.5}
                  position={"middle"}
                >
                  ₹211.76
                </Item>
              </Row>
              {(isSelected || isSedanSelected || isAutoSelected) && (
                <Button
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#002",
                    color: "#fff",
                  }}
                  variant="contained"
                  type="submit"
                  fullWidth
                  onClick={handlePayment}
                >
                  BOOK
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
