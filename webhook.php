<?php

    date_default_timezone_set("Asia/Dhaka");

    function sendmsg($result) {
        $data = new \stdclass();
        $data->fulfillmentMessages[0]->text->text[0] = $result;
        $data = json_encode($data);
        echo $data;
    }

    function getTime($date, $stat) {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "http://api.aladhan.com/v1/timingsByCity/$date?city=Dhaka&country=Bangladesh&method=1",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "x-rapidapi-host: coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key: 676a9dace2msh26245f119ccfa57p17c33djsn05eea3176681"
            ),
        ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);
        
        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            $response = json_decode($response, true);
            
            $Fajr = $response['data']['timings']['Fajr'];
            $Maghrib = $response['data']['timings']['Maghrib'];

            $Sehri = strtotime($Fajr);
            $Sehri = $Sehri - (6 * 60);
            $Sehri = date('h:i', $Sehri);

            $Maghrib = strtotime($Maghrib);
            $Maghrib = date('h:i', $Maghrib);

            $date = str_replace(array('-'), array('/'), $date);

            $result = $date." - Dhaka,\n".$stat." জন্য\nসেহরির এর শেষ সময় ".$Sehri."\nফজর এর আযান ".$Fajr."\nইফতার এর সময় ".$Maghrib;

            $en = array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
            $bn = array("০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯");

            $result = str_replace($en, $bn, $result);

            sendMsg($result);
            
        }
    }

    function setTime() {

        $currentDate = date('H:m');
        $currentDate = strtotime($currentDate);

        $condDate1 = "12:00";
        $condDate1 = strtotime($condDate1);

        $condDate2 = "18:40";
        $condDate2 = strtotime($condDate2);

        if($currentDate < $condDate1) {
            $date = date('d-m-Y');
            $stat = "আজকের";
            getTime($date, $stat);
            die();
        }
        /*
        if($currentDate >= $condDate1 && $condDate1 < $condDate2) {
            $date = date('d-m-Y');
            getTime($date);
            die();
        }
        */
        if($currentDate >= $condDate1) {
            $date = date('d-m-Y');
            $date = strtotime($date);
            $date = $date + (24 * 60 * 60);
            $date = date('d-m-Y', $date);
            $stat = "আগামিকালের";
            getTime($date, $stat);
            die();
        }

    }

    setTime()