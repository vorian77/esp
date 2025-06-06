CREATE MIGRATION m16xiomjjkiakt7uctljtvkqez45e4fn5ipnuit2hqtgp6qtu55hfq
    ONTO m1tfz52e4oox6eosz2zpwa63fwupyhj4hxl76h5trm43nr3duivtda
{
  ALTER FUNCTION sys_core::getDataObjColumn(dataObjName: std::str, columnName: std::str) USING (SELECT
      std::assert_single((SELECT
          sys_core::SysDataObjColumn
      FILTER
          ((.id IN ((SELECT
              sys_core::SysDataObj
          FILTER
              (.name = dataObjName)
          )).columns.id) AND ((.column.name = columnName) OR (.nameCustom = columnName)))
      ))
  );
};
