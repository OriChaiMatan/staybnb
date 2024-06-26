import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { MapImages } from "./MapImages";
import searchIcon from "../../assets/img/search_glass.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { GuestsModal } from "./GuestsModal";
import { useSearchParams } from "react-router-dom";
import { CalendarPicker } from "../CalendarPicker";
import { utilService } from "../../services/util.service";
import { useWindowSize } from "../../customHooks/useWindowSize";

export function MainFilter({ largeMainFilter, setLargeMainFilter }) {
  const [activeMainFilter, setActiveMainFilter] = useState(-1);
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const [adultsAmount, setAdultsAmount] = useState(0);
  const [childrenAmount, setChildrenAmount] = useState(0);
  const [infantsAmount, setInfantsAmount] = useState(0);
  const [petsAmount, setPetsAmount] = useState(0);
  const [selectedDestination, setSelectedDestination] =
    useState("Search destination");
  const [selectedGuests, setSelectedGuests] = useState(0);
  const mainFilterRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const windowSize = useWindowSize()

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        setActiveMainFilter(-1);
      }
    };

    const handleClickOutside = (event) => {
      if (
        mainFilterRef.current &&
        !mainFilterRef.current.contains(event.target)
      ) {
        setLargeMainFilter(false);
        setActiveMainFilter(-1);
        setSelectedRange({ start: null, end: null });
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleMainFilterSize() {
    if (!largeMainFilter) {
      setLargeMainFilter(true);
    }
  }

  function handleRangeChange(range) {
    setSelectedRange(range);
  }

  function handleSelectDestination(dest) {
    setSelectedDestination(dest);
    setActiveMainFilter(1);
  }

  useEffect(() => { }, [activeMainFilter, selectedDestination]);

  function handleAmountChange(type, operation) {
    switch (type) {
      case "adults":
        setAdultsAmount((prevAmount) =>
          operation === "increment"
            ? prevAmount + 1
            : prevAmount > 0
              ? prevAmount - 1
              : 0
        );
        break;
      case "children":
        setChildrenAmount((prevAmount) =>
          operation === "increment"
            ? prevAmount + 1
            : prevAmount > 0
              ? prevAmount - 1
              : 0
        );
        break;
      case "infants":
        setInfantsAmount((prevAmount) =>
          operation === "increment"
            ? prevAmount + 1
            : prevAmount > 0
              ? prevAmount - 1
              : 0
        );
        break;
      case "pets":
        setPetsAmount((prevAmount) =>
          operation === "increment"
            ? prevAmount + 1
            : prevAmount > 0
              ? prevAmount - 1
              : 0
        );
        break;
      default:
        break;
    }
    setSelectedGuests((prev) => {
      if (operation === "increment") {
        return prev + 1;
      } else {
        return prev > 0 ? prev - 1 : 0;
      }
    });
  }

  function onSubmitFilter() {
    const currentParams = new URLSearchParams(searchParams);

    if (selectedRange.start && selectedRange.end) {
      currentParams.set(
        "startDate",
        selectedRange.start.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
      currentParams.set(
        "endDate",
        selectedRange.end.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
    }
    if (selectedDestination !== "Search destination") {
      currentParams.set("country", selectedDestination);
    }
    if (selectedGuests > 0) {
      currentParams.set("capacity", selectedGuests);
    }

    setSearchParams(currentParams);

    setLargeMainFilter(false);
    setActiveMainFilter(-1);
    setSelectedRange({ start: null, end: null });
    setSelectedGuests(0);
    setAdultsAmount(0);
    setChildrenAmount(0);
    setInfantsAmount(0);
    setPetsAmount(0);
    setSelectedDestination("Search destination");
  }

  return (
    <div
      ref={mainFilterRef}
      className={`main-filter-header ${largeMainFilter ? "large-main-filter" : ""
        }`}
      onClick={toggleMainFilterSize}
      style={{ backgroundColor: activeMainFilter >= 0 ? "#ebebeb" : "#fff" }}
    >
      {largeMainFilter ? (
        <label
          className={`main-filter-btn large ${activeMainFilter === 0 ? "active-filter" : ""
            }`}
          onClick={() => {
            setActiveMainFilter(0);
          }}
        >
          <div>
            <span className="bold">Where</span> <br></br>{" "}
            <input
              className="dest-input"
              type="text"
              placeholder={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
            />
          </div>
          {activeMainFilter === 0 && (
            <section className="add-dest-modal">
              <div className="name">
                <h2 className="search-by-region">Search by region</h2>
                <MapImages
                  handleSelectDestination={handleSelectDestination}
                  setActiveMainFilter={setActiveMainFilter}
                />
              </div>
            </section>
          )}
        </label>
      ) : (
        <button
          className="main-filter-btn"
          onClick={() => {
            setActiveMainFilter(0);
          }}
        >
          Anywhere
        </button>
      )}
      <div className="border-line"></div>
      {largeMainFilter ? (
        <label
          className={`main-filter-btn large ${activeMainFilter === 1 ? "active-filter" : ""
            }`}
          onClick={() => {
            setActiveMainFilter(1);
          }}
        >
          <div className="name">
            <span className="bold">Check in</span> <br></br>
            {selectedRange.start && selectedRange.end
              ? utilService.formatMonthDay(selectedRange.start)
              : "Add dates"}
          </div>
        </label>
      ) : (
        <button
          className="main-filter-btn"
          onClick={() => {
            setActiveMainFilter(1);
          }}
        >
          Any week
        </button>
      )}
      <div className="border-line"></div>
      {largeMainFilter && (
        <label
          className={`main-filter-btn large ${activeMainFilter === 2 ? "active-filter" : ""
            }`}
          onClick={() => {
            setActiveMainFilter(2);
          }}
        >
          <div className="name">
            <span className="bold">Check out</span> <br></br>
            {selectedRange.end
              ? utilService.formatMonthDay(selectedRange.end)
              : "Add dates"}
          </div>
        </label>

      )}
      {largeMainFilter && <div className="border-line"></div>}

      {largeMainFilter && windowSize.width < 780 && (
        <label
          className={`main-filter-btn large`}
        >
          <button className="large-search-btn" onClick={onSubmitFilter}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>Search</span>
          </button>
        </label>


      )}
      {(activeMainFilter === 1 || activeMainFilter === 2) && (
        <section className="add-dates-modal">
          <CalendarPicker range={selectedRange}
            setRange={setSelectedRange}
          />
        </section>
      )}
      {largeMainFilter ? (
        windowSize.width >= 780 && (
          <div className="main-filter-btn large">
            <label
              className={`filter-content ${activeMainFilter === 3 ? "active-filter" : ""
                }`}
              onClick={() => {
                setActiveMainFilter(3);
              }}
            >
              <div className="name">
                <span className="bold">Who</span> <br className="bold"></br>
                {selectedGuests
                  ? `${selectedGuests} ${selectedGuests === 1 ? "guest" : "guests"
                  }`
                  : "Add guests"}
              </div>
            </label>
            {activeMainFilter < 0 ? (
              <img
                className="large-circle-search-glass"
                src={searchIcon}
                alt="search-icon"
              />
            ) : (
              <button className="large-search-btn" onClick={onSubmitFilter}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span>Search</span>
              </button>
            )}

            {activeMainFilter === 3 && (
              <GuestsModal
                adultsAmount={adultsAmount}
                childrenAmount={childrenAmount}
                infantsAmount={infantsAmount}
                petsAmount={petsAmount}
                handleAmountChange={handleAmountChange}
              />
            )}
          </div>
        )
      ) : (
        <>
          <button
            className="main-filter-btn"
            onClick={() => {
              setActiveMainFilter(3);
            }}
          >
            Add guests
          </button>
          <img className="search-glass" src={searchIcon} alt="search-icon" />
        </>
      )}
    </div>
  );
}
