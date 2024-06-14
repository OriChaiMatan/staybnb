import { useState, useEffect } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { stayService } from "../services/stay.service";
import { StayList } from "../cmps/StayList";
import { LabelsFilter } from "../cmps/LabelsFilter";
import { StayIndexSkeleton } from "../cmps/StayIndexSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { loadStays, setFilterBy, saveStay } from "../store/actions/stay.action";
import { LabelFilterSkeleton } from "../cmps/LabelFilterSkeleton";

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  console.log("filterby: ", filterBy)

  useEffect(() => {
    setFilterBy(stayService.getFilterFromParams(searchParams))
  }, [searchParams])

  useEffect(() => {
    const sanitizedFilterBy = Object.fromEntries(
      Object.entries(filterBy).filter(
        ([key, value]) => value !== undefined && value !== ""
      )
    )

    setSearchParams(sanitizedFilterBy)
    loadStays()
  }, [filterBy])

  function onSetFilter(fieldsToUpdate) {
    setFilterBy(fieldsToUpdate);
  }

  async function onAddStay(stay) {
    try {
      await saveStay(stay)
    } catch (err) {
      console.log("Had issues adding stay", err)
    }
  }

  async function onUpdateStay(stay) {
    try {
      await saveStay(stay)
    } catch (err) {
      console.log('Error in onUpdateStay', err)
    }
  }

  if (!stays) return <>
    <LabelFilterSkeleton />
    <StayIndexSkeleton />
  </>;

  return (
    <>
      <LabelsFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <div className="stay-index">
        <StayList stays={stays} onUpdateStay={onUpdateStay} />
      </div>
      <Outlet context={{ title: "hi", onAddStay }} />
    </>
  )
}
