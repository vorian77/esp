CREATE MIGRATION m14kuph5cvfbyooryuvf7acocy3fxtaca26info7ra6ydyiddpzu2a
    ONTO m1dhohwukov4wywttnkdxuc7vtt6rqq3uiimf6lvaqltfjuz2uotga
{
  ALTER FUNCTION sys_core::getSystem(nameOwner: std::str, nameSystem: std::str) USING (SELECT
      std::assert_single((SELECT
          sys_core::SysSystem
      FILTER
          ((.owner.name = nameOwner) AND (.name = nameSystem))
      ))
  );
};
