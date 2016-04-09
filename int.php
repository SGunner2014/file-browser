<?php
    const ROOT_PATH = "C:\\wamp64\\www\\files\\files";

    function getDirectoryListing($dirPath) { //Gets all files within the "file" directory and returns it as an array.
        $files = array();
        $toListDir = realpath(ROOT_PATH . "/" . $dirPath);
        if (substr($toListDir, 0, strlen(ROOT_PATH)) != ROOT_PATH) {
            $toListDir = realpath("files");
        }
        $initialListing = scandir($toListDir);
        foreach ($initialListing as $item) {
            $itemPath = realpath($toListDir . "/" . $item);
            if ($item != ".." and $item != ".") {
                if (is_file($itemPath)) {
                    $files[$item] = "file";
                } else {
                    $files[$item] = "dir";
                }
            }
        }
        return $files;
    }

    if (isset($_GET['dir'])) {
        $listings = getDirectoryListing($_GET['dir']);
    } else {
        $listings = getDirectoryListing("");
    }
    echo json_encode($listings);
?>