CREATE MIGRATION m13o3yoibjecden7icn7lsr6pagwk2mtof34566yjwarj7nswiktnq
    ONTO m1olqgwhdlxrs7gfpyzx357pjajy37su26xquu2xrotyonejepj3xq
{
              ALTER TYPE org_moed::MoedPartData {
      ALTER LINK participant {
          RESET OPTIONALITY;
      };
  };
};
