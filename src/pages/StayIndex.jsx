import { useState, useEffect } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { stayService } from "../services/stay.service";
import { StayList } from "../cmps/StayList";
import { LabelsFilter } from "../cmps/LabelsFilter";
import { StayIndexSkeleton } from "../cmps/StayIndexSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { loadStays, setFilterBy } from "../store/actions/stay.action";

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("STAYS", stays);

  useEffect(() => {
    setFilterBy(stayService.getFilterFromParams(searchParams));
  }, [searchParams]);

  useEffect(() => {
    const sanitizedFilterBy = Object.fromEntries(
      Object.entries(filterBy).filter(
        ([key, value]) => value !== undefined && value !== ""
      )
    );

    setSearchParams(sanitizedFilterBy);
    loadStays();
  }, [filterBy]);

  function onSetFilter(fieldsToUpdate) {
    setFilterBy(fieldsToUpdate);
  }

  async function onAddStay(stay) {
    try {
      const savedStay = await stayService.save(stay);
      loadStays();
    } catch (err) {
      console.log("Had issues adding stay", err);
    }
  }

  if (!stays) return <StayIndexSkeleton />;

  return (
    <>
      <LabelsFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <div className="stay-index">
        <StayList stays={stays} />
      </div>
      <Outlet context={{ title: "hi", onAddStay }} />
    </>
  );
}
