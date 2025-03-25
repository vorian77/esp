CREATE MIGRATION m1e6rariwj3sbazyprjt6usgq22542tc62jx2ljrrbkd4dbieehe4q
    ONTO m1vemc25eex3igs3p34tf5kjy4zoci6piyjapl3mcf7trb7fnr7gja
{
  ALTER FUNCTION sys_core::getObjEntAttr(ownerName: std::str, name: std::str) {
      RENAME TO sys_core::getAttr;
  };
};
