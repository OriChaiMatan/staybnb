import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/img/airbnb-1.svg";
import { MainFilter } from "./app-header/MainFilter";
import { UserActions } from "./app-header/UserActions";
import { stayService } from "../services/stay.service";
import { socketService, SOCKET_EVENT_NEW_ORDER } from '../services/socket.service';
import { eventBusService, showSuccessMsg } from "../services/event-bus.service";


//listen to socket of new order-and close it
//listen to socket of order status


export function AppHeader({ largeMainFilter, setLargeMainFilter }) {
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
      console.log('Received new order event:', buyer_id)
      showSuccessMsg('new order from' + buyer_id)
    })
    return () => {
      socketService.off(SOCKET_EVENT_NEW_ORDER)
    }
  }, [])

  return (
    <header className={`app-header ${largeMainFilter ? "large-header" : ""}`}>
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
