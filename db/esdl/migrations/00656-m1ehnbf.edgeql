CREATE MIGRATION m1ehnbfflzkgpk6qei2g4kqdtbtt5gz5c3376yk7rcsmrvebpq3sfa
    ONTO m1ecuy4u44peafs4vujjze6x7wotw5weshjdbhohmqfkwtie3hgctq
{
  ALTER TYPE sys_user::Mgmt {
      ALTER PROPERTY modifiedAt {
          RESET OPTIONALITY;
      };
  };
};
