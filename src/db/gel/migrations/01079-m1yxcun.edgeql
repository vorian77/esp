CREATE MIGRATION m1yxcungr3xfjz2zlifgn7pqhhhqsojjibxbrawtaicoz6risveu7a
    ONTO m1f2butfwalfntabkka33hvregt4ddu7ltn6dcmonsugklafxmpkba
{
  ALTER TYPE sys_core::SysMsg {
      ALTER LINK recipients {
          RESET OPTIONALITY;
      };
  };
};
