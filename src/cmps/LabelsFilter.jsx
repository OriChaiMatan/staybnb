import beach from "../assets/img/label_icons_img/beach.png"
import beachfront from "../assets/img/label_icons_img/beachfront.png"
import vineyards from "../assets/img/label_icons_img/vineyards.png"
import mansions from "../assets/img/label_icons_img/mansions.png"
import lake from "../assets/img/label_icons_img/lake.png"
import treehouses from "../assets/img/label_icons_img/treehouses.png"
import farms from "../assets/img/label_icons_img/farms.png"
import skiing from "../assets/img/label_icons_img/skiing.png"
import amazing_pools from "../assets/img/label_icons_img/amazing_pools.png"
import earth_homes from "../assets/img/label_icons_img/earth_homes.png"
import amazing_views from "../assets/img/label_icons_img/amazing_views.png"
import desert from "../assets/img/label_icons_img/desert.png"
import lakefront from "../assets/img/label_icons_img/lakefront.png"
import islands from "../assets/img/label_icons_img/islands.png"
import tropical from "../assets/img/label_icons_img/tropical.png"
import camping from "../assets/img/label_icons_img/camping.png"
import surfing from "../assets/img/label_icons_img/surfing.png"
import bed_breakfasts from "../assets/img/label_icons_img/bed_breakfasts.png"
import luxe from "../assets/img/label_icons_img/luxe.png"
import top_of_the_world from "../assets/img/label_icons_img/top_of_the_world.png"
import ski_in_out from "../assets/img/label_icons_img/ski-in-out.png"


export function LabelsFilter() {

  const labels = [
    { imgSrc: beach, altText: "beach-img", name: "Beach" },
    { imgSrc: beachfront, altText: "beachfront-img", name: "Beachfront" },
    { imgSrc: vineyards, altText: "vineyards-img", name: "Vineyards" },
    { imgSrc: mansions, altText: "mansions-img", name: "Mansions" },
    { imgSrc: lake, altText: "lake-img", name: "Lake" },
    { imgSrc: treehouses, altText: "treehouses-img", name: "Treehouses" },
    { imgSrc: farms, altText: "farms-img", name: "Farms" },
    { imgSrc: skiing, altText: "skiing-img", name: "Skiing" },
    { imgSrc: amazing_pools, altText: "amazing-pools-img", name: "Amazing pools" },
    { imgSrc: earth_homes, altText: "earth-homes-img", name: "Earth homes" },
    { imgSrc: amazing_views, altText: "amazing-views-img", name: "Amazing views" },
    { imgSrc: desert, altText: "desert-img", name: "Desert" },
    { imgSrc: lakefront, altText: "lakefront-img", name: "Lakefront" },
    { imgSrc: islands, altText: "islands-img", name: "Islands" },
    { imgSrc: tropical, altText: "tropical-img", name: "Tropical" },
    { imgSrc: camping, altText: "camping-img", name: "Camping" },
    { imgSrc: surfing, altText: "surfing-img", name: "Surfing" },
    { imgSrc: bed_breakfasts, altText: "bed-breakfasts-img", name: "Bed & breakfasts" },
    { imgSrc: luxe, altText: "luxe-img", name: "Luxe" },
    { imgSrc: top_of_the_world, altText: "top-of-the-world-img", name: "Top of the world" },
    { imgSrc: ski_in_out, altText: "ski-in-out-img", name: "Ski-in/out" }
  ]


  return (
    <section className="label-filter full">
      <div className="label-filter-content">
        <img src={beach} />
      </div>
    </section>
  )

}
