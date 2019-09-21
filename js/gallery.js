const concept_art = [
    {url: "img/galleries/concept/Abilities_Concept.png"},
    {url: "img/galleries/concept/Levers_concept.jpg"},
    {url: "img/galleries/concept/Memory_Fragments_Concept.png"},
    {url: "img/galleries/concept/OldMushboomConcept.jpg"},
    {url: "img/galleries/concept/ScavengerConcept.png"},
    {url: "img/galleries/concept/Shrubble_Concept.jpg"},
    {url: "img/galleries/concept/sketch.png"},
    {url: "img/galleries/concept/SpaceYami.jpg"},
    {url: "img/galleries/concept/Tresswing.png"},
    {url: "img/galleries/concept/Yami_NomadConcept.png"}
]

const pixel_art = [
    {url:"img/galleries/pixel/brothers.png"},
    {url:"img/galleries/pixel/crystals.png"},
    {url:"img/galleries/pixel/enemies.png"},
    {url:"img/galleries/pixel/Tree_Pixel.png"},
    {url:"img/galleries/pixel/Portal_idle.gif"},
    {url:"img/galleries/pixel/fire4purple.gif"},
    {url:"img/galleries/pixel/Wanderingnomad_idle.gif"},
    {url:"img/galleries/pixel/W1_02_Shrubble_IDle.gif"}
    
]


// const media = [{url:"img/powerups.png"},{url:"img/yamilogo.png"},{url:"img/brothers.png"}];

let concept_gallery = gallery_plugin("concept-gallery",concept_art,1);
let screen_gallery = gallery_plugin("pixel-gallery",pixel_art,1);
// let video_gallery = gallery_plugin("video-gallery",media,1);
