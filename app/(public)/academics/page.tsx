import { InfoPage } from "@/components/site/info-page";
import { programs } from "@/lib/school-data";

export default function AcademicsPage() {
  return (
    <InfoPage
      eyebrow="Academics"
      title="CBSE affiliated progression from foundational years to Grade 10."
      image="/images/school/academics-classroom.png"
      body={[
        "Academics at Skalvi are strengthened through health, physical activity, projects and co-curricular integration.",
        "The classroom model values equal attention, hands-on experiences, NEP readiness and a fun-based learning environment."
      ]}
      listTitle="Programs"
      list={programs}
    />
  );
}
