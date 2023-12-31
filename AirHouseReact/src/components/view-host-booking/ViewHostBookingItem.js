import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PopUpContainer from "ui/PopUpContainer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Avatar from "react-avatar";
import { Rating } from "react-simple-star-rating";
import { HostRatingMutation } from "api/startApi";
import { HostReviewUserQuery } from "api/startApi";
import { useQueryClient } from "@tanstack/react-query";
import { UserQuery } from "api/userApi";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { DenyBookingMutation } from "api/userBookingApi";
import { AcceptBookingMutation } from "api/userBookingApi";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr;
  grid-auto-rows: 13.5rem;

  column-gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 10px;
  line-height: 20px;

  .icon {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 1150px) {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 14rem auto;

    & .first {
      grid-column: 1/3;
    }
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    grid-template-rows: 14rem auto auto;

    & .first {
      grid-column: 1;
    }
  }
`;

const StyledFirst = styled.div`
  width: 100%;
  cursor: pointer;
  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  & .skeleton {
    height: 100%;
    width: 100%;
  }
`;

const StyledSecond = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 1.5rem;

  h3 {
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  h3:hover {
    text-decoration: underline;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;

    > p {
      font-size: 14px;

      .icon {
        margin-right: 5px;
      }
    }
  }

  .span {
    font-size: 14px;
    margin-right: 10px;

    & span {
      font-weight: 600;
    }
  }

  .to {
    font-weight: 600;
  }

  .dollar {
    font-weight: 600;
    font-size: 15px;
  }

  h5 {
    font-size: 13px;
    color: red;
  }
`;

const StyledThird = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  & .avatar {
    cursor: pointer;
  }

  & p {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
  }

  & button {
    cursor: pointer;
    background-color: red;
    border: none;
    color: white;
    border-radius: 5px;
  }
`;

export const BookingItemSkeleton = () => {
  return (
    <StyledContainer>
      <StyledFirst>
        <Skeleton className="skeleton" />
      </StyledFirst>
      <StyledSecond>
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
        <Skeleton />
      </StyledSecond>
      <StyledThird>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </StyledThird>
    </StyledContainer>
  );
};

const StyledPopUp = styled(PopUpContainer)`
  position: fixed;
  width: 30rem;
  height: 20rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  h3 {
    font-size: 17px;
    font-weight: 600;
  }

  & textarea {
    resize: none;
    flex-grow: 1;
    padding: 1rem;
    width: 100%;
    border-radius: 25px;

    &:focus,
    &:hover {
      border: 1px solid red;
      outline: 1px solid red;
    }
  }

  & button {
    background-color: red;
    border-radius: 15px;
    color: white;
    cursor: pointer;
    padding: 5px 10px;
    border: none;
  }
`;

const StyledDisplayNone = styled.div`
  display: none;
`;

function convertToLocalDatetime(datetimeString) {
  let date = new Date(datetimeString);
  return date.toLocaleString();
}

export default function ViewHostBookingItem({ data, choice, currentPage }) {
  const userQuery = UserQuery();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const denyMutation = DenyBookingMutation();
  const acceptMutation = AcceptBookingMutation();

  const rating = data.user.ratings?.find(
    (item) => item.host_id == userQuery.data.user.id && item.property_id == null
  );

  const [showMessage, setShowMessage] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [ratingStar, setRatingStar] = useState(rating?.start);
  const [ratingMessage, setRatingMessage] = useState(rating?.message);

  const ratingMutation = HostRatingMutation();

  const onClickShowMessage = () => {
    setShowMessage(true);
  };

  const onClickUpdate = (id) => {
    navigate({
      pathname: "/user/host-update/become-host",
      search: `?id=${id}`,
    });
  };

  const onShowBooking = () => {
    navigate({
      pathname: "/user/booking-detail",
      search: `property_id=${data.id}`,
    });
  };

  const onClickBookingDetail = () => {
    navigate({
      pathname: "/user/booking-detail",
      search: `?property_id=${data.property.id}`,
    });
  };

  const onClickProperty = () => {
    navigate({
      pathname: "/property",
      search: `?id=${data.property.id}`,
    });
  };

  const onRating = () => {
    if (!ratingStar || !ratingMessage) {
      alert("Please fill in information");
    }

    const payload = {
      user_id: data.user.id,
      start: ratingStar,
      message: ratingMessage,
      booking_id: data.id,
    };

    ratingMutation.mutate(payload, {
      onSuccess: () => {
        alert("success");
        setShowRating(false);
      },
    });
  };

  const onDeny = (id) => {
    if (!window.confirm("Are you sure you want to deny this booking?")) {
      return;
    }
    const formData = new FormData();
    formData.append("booking_id", id);

    denyMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["all", "bookings"] });
        alert("success");
      },
    });
  };

  const onAccept = (id) => {
    if (!window.confirm("Are you sure you want to accept this booking?")) {
      return;
    }
    const formData = new FormData();
    formData.append("booking_id", id);

    acceptMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["all", "bookings"] });
        alert("success");
      },
    });
  };
  return (
    <>
      <StyledContainer>
        <StyledFirst onClick={onClickProperty} className="first">
          <img src={data.property.images[0].image} />
        </StyledFirst>
        <StyledSecond>
          <h3 onClick={onClickBookingDetail}>
            {data.property.name} - {data.id} -{" "}
            {data.booking_status.charAt(0).toUpperCase() +
              data.booking_status.slice(1)}
          </h3>
          <div>
            <p>
              <FontAwesomeIcon className="icon" icon={faAddressBook} />
              {data.property.address}
            </p>
            <p>
              <FontAwesomeIcon className="icon" icon={faCalendar} /> From{" "}
              {data.check_in_date} <span className="to">to</span>{" "}
              {data.check_out_date}
            </p>
            <p>
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <span>{data.user.email}</span>{" "}
            </p>
            <p>
              <FontAwesomeIcon className="icon" icon={faDollar} />
              <span className="dollar">{data.price_for_stay}</span>{" "}
            </p>
            {data.booking_status == "waiting" && (
              <h5>
                The booking request will be automatically converted to "denied"
                after 72 hours from {convertToLocalDatetime(data.created_at)}
              </h5>
            )}
          </div>
        </StyledSecond>
        <StyledThird className="third">
          <Avatar
            onClick={() =>
              window.open(`/profile/dashboard/${data.user.id}`, "_blank")
            }
            className="avatar"
            src={data.user.image}
            size="50px"
            textSizeRatio={3}
            round={true}
            name={data.user.first_name}
          />
          {data.booking_status == "waiting" && (
            <button onClick={() => onAccept(data.id)}>Accept</button>
          )}
          {data.booking_status == "waiting" && (
            <button onClick={() => onDeny(data.id)}>Deny</button>
          )}

          {data.booking_status == "success" && (
            <button onClick={() => setShowRating(true)}>Rating</button>
          )}
          <button
            onClick={() => {
              navigate("/user/chat/", {
                replace: false,
                state: {
                  user_Email: data.user.email,
                  first_Name: data.user.first_name,
                  last_Name: data.user.last_name,
                },
              });
            }}
          >
            Send Message
          </button>
        </StyledThird>
      </StyledContainer>
      {showMessage ? (
        <StyledPopUp setShowPopUp={setShowMessage}>
          <h3>Admin</h3>
          <textarea value={data.admin_message}></textarea>
        </StyledPopUp>
      ) : (
        <StyledDisplayNone></StyledDisplayNone>
      )}
      {showRating ? (
        <StyledPopUp setShowPopUp={setShowRating}>
          <h3>Admin</h3>
          <Rating onClick={setRatingStar} initialValue={ratingStar} />
          <textarea
            value={ratingMessage}
            onChange={(ev) => setRatingMessage(ev.target.value)}
          ></textarea>
          <button onClick={onRating}>submit</button>
        </StyledPopUp>
      ) : (
        <StyledDisplayNone></StyledDisplayNone>
      )}
    </>
  );
}
