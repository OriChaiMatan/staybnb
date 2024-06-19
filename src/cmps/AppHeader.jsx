import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/img/airbnb-1.svg";
import { MainFilter } from "./app-header/MainFilter";
import { UserActions } from "./app-header/UserActions";
import { stayService } from "../services/stay.service";
import { socketService, SOCKET_EVENT_NEW_ORDER, SOCKET_EVENT_ORDER_STATUS, SOCKET_EVENT_USER_WATCHING_STAY } from '../services/socket.service';
import { eventBusService, showSuccessMsg } from "../services/event-bus.service";


//listen to socket of new order-and close it
//listen to socket of order status


export function AppHeader({ largeMainFilter, setLargeMainFilter }) {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const detailsPathname = `/${pathname}/`
  const defaultFilter = stayService.getDefaultFilter();

  const defaultFilterParams = Object.entries(defaultFilter).reduce(
    (acc, [key, value]) => {
      if (value && (!Array.isArray(value) || value.length > 0))
        acc.append(key, value);
      return acc;
    },
    new URLSearchParams()
  );

  useEffect(() => {
    socketService.on(SOCKET_EVENT_NEW_ORDER, (buyer_id) => {
      showSuccessMsg('New order from ' + buyer_id)
    })
    return () => {
      socketService.off(SOCKET_EVENT_NEW_ORDER)
    }
  }, [])

  useEffect(() => {
    socketService.on(SOCKET_EVENT_ORDER_STATUS, (order) => {
      showSuccessMsg(`Your order status in ${order.stay.name} has been updated`)
    })
    return () => {
      socketService.off(SOCKET_EVENT_ORDER_STATUS)
    }
  }, [])

  useEffect(() => {
    socketService.on(SOCKET_EVENT_USER_WATCHING_STAY, ({ userName, stayName }) => {
      showSuccessMsg(`User: ${userName} is watching your stay: ${stayName} ! `)
    })
    return () => {
      socketService.off(SOCKET_EVENT_USER_WATCHING_STAY)
    }
  }, [])

  return (
    <header className={`app-header ${largeMainFilter ? "large-header" : ""} ${detailsPathname === '/stay/' ? "hidden-z-index" : ""}`}>
      <div className="app-header-logo-nav">
        <NavLink to={`/?${defaultFilterParams.toString()}`}>
          <img className="app-logo" src={logo} alt="logo" />
          <h1>staybnb</h1>
        </NavLink>
      </div>
      <MainFilter
        largeMainFilter={largeMainFilter}
        setLargeMainFilter={setLargeMainFilter}
      />
      <UserActions />
    </header>
  );
}
