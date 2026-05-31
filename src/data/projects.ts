export type ProjectCategory = 'Housing' | 'Clean Water' | 'Disaster Relief' | 'Education' | 'Food Aid';

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  location: string;
  date: string;
  desc: string;
  beneficiaries: number;
  img: string;
}

export const projects: Project[] = [
  {id:1,title:"Flood Relief — Dadu District",category:"Disaster Relief",location:"Dadu, Sindh",date:"Aug 2022",desc:"Emergency food packages and shelter kits distributed to 200 flood-affected families within 48 hours.",beneficiaries:200,img:"https://picsum.photos/400/260?random=101"},
  {id:2,title:"Hand Pump Installation — Dera Ghazi Khan",category:"Clean Water",location:"Dera Ghazi Khan, Punjab",date:"Mar 2023",desc:"5 hand pumps installed in remote villages, providing clean drinking water to over 600 people.",beneficiaries:600,img:"https://picsum.photos/400/260?random=102"},
  {id:3,title:"Flood Housing — Larkana",category:"Housing",location:"Larkana, Sindh",date:"Oct 2022",desc:"30 permanent homes constructed for families who lost everything in the 2022 super floods.",beneficiaries:150,img:"https://picsum.photos/400/260?random=103"},
  {id:4,title:"Winter Food Drive — Quetta",category:"Food Aid",location:"Quetta, Balochistan",date:"Dec 2023",desc:"2,000 monthly ration packs distributed to destitute families during the harsh Balochistan winter.",beneficiaries:2000,img:"https://picsum.photos/400/260?random=104"},
  {id:5,title:"Solar Tube Well — Thar Desert",category:"Clean Water",location:"Tharparkar, Sindh",date:"May 2023",desc:"Solar-powered tube well installed providing year-round water supply to an entire desert village.",beneficiaries:350,img:"https://picsum.photos/400/260?random=105"},
  {id:6,title:"Earthquake Relief — Swat Valley",category:"Disaster Relief",location:"Swat, KPK",date:"Oct 2023",desc:"Emergency relief kits, blankets, and medical supplies delivered to earthquake-affected families.",beneficiaries:500,img:"https://picsum.photos/400/260?random=106"},
  {id:7,title:"Prefab Homes — Rajanpur",category:"Housing",location:"Rajanpur, Punjab",date:"Jan 2024",desc:"50 prefabricated flood-resistant homes built for displaced families in Southern Punjab.",beneficiaries:250,img:"https://picsum.photos/400/260?random=107"},
  {id:8,title:"School Roof Restoration — Mirpurkhas",category:"Education",location:"Mirpurkhas, Sindh",date:"Feb 2024",desc:"Restored roofs and classrooms for 3 flood-damaged government schools serving 800 students.",beneficiaries:800,img:"https://picsum.photos/400/260?random=108"},
  {id:9,title:"Water Filtration Plant — Rahim Yar Khan",category:"Clean Water",location:"Rahim Yar Khan, Punjab",date:"Jun 2023",desc:"Community water filtration unit installed, eliminating waterborne diseases in a village of 400 people.",beneficiaries:400,img:"https://picsum.photos/400/260?random=109"},
  {id:10,title:"Cyclone Relief — Gwadar",category:"Disaster Relief",location:"Gwadar, Balochistan",date:"Nov 2023",desc:"Immediate relief for 150 fishing families hit by Cyclone Dana — nets, food, and temporary shelter.",beneficiaries:750,img:"https://picsum.photos/400/260?random=110"},
  {id:11,title:"Brick Homes — Jacobabad",category:"Housing",location:"Jacobabad, Sindh",date:"Apr 2024",desc:"25 permanent brick homes with proper roofing built for chronically poor families in rural Jacobabad.",beneficiaries:125,img:"https://picsum.photos/400/260?random=111"},
  {id:12,title:"Ramadan Food Packages — Nationwide",category:"Food Aid",location:"Multiple Districts",date:"Mar 2024",desc:"5,000 Ramadan food packages distributed across 8 districts during the holy month.",beneficiaries:5000,img:"https://picsum.photos/400/260?random=112"},
];

export const extraProjects: Project[] = [
  {id:13,title:"Tent City Setup — Lal Suhanra",category:"Disaster Relief",location:"Bahawalpur, Punjab",date:"Sep 2022",desc:"600 tents erected for flood-displaced families awaiting permanent housing.",beneficiaries:3000,img:"https://picsum.photos/400/260?random=131"},
  {id:14,title:"Village Hand Pump — Lodhran",category:"Clean Water",location:"Lodhran, Punjab",date:"Jul 2023",desc:"Hand pump serving 300 villagers previously walking 2km daily for water.",beneficiaries:300,img:"https://picsum.photos/400/260?random=132"},
  {id:15,title:"Transitional Shelter — Nowshera",category:"Housing",location:"Nowshera, KPK",date:"Nov 2022",desc:"Transitional shelters for 40 families in KPK while permanent housing was being constructed.",beneficiaries:200,img:"https://picsum.photos/400/260?random=133"},
  {id:16,title:"Eid Food Packages — Karachi",category:"Food Aid",location:"Karachi, Sindh",date:"Apr 2023",desc:"1,500 Eid hampers distributed to deserving families in Karachi's katchi abadis.",beneficiaries:1500,img:"https://picsum.photos/400/260?random=134"},
  {id:17,title:"Borehole Drilling — Khuzdar",category:"Clean Water",location:"Khuzdar, Balochistan",date:"Aug 2023",desc:"Deep borehole drilled providing clean water to a community that had none for 3 years.",beneficiaries:450,img:"https://picsum.photos/400/260?random=135"},
  {id:18,title:"Emergency Shelter Kits — Zhob",category:"Disaster Relief",location:"Zhob, Balochistan",date:"Jan 2024",desc:"Emergency tarpaulins, ropes, and blankets for 100 families displaced by flash floods.",beneficiaries:500,img:"https://picsum.photos/400/260?random=136"},
];

export const catClass: Record<ProjectCategory, string> = {
  'Housing':'cat-housing',
  'Clean Water':'cat-water',
  'Disaster Relief':'cat-relief',
  'Education':'cat-education',
  'Food Aid':'cat-food'
};
