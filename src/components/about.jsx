const about = () => {
  return (
    <div className="About">
      <h1><center><b>About</b></center></h1>
        <hr/>
        <div>
          <b>Apa itu Water Sensor ?</b> <br/>
            Water Sensor merupakan alat berbentuk pelampung yang digunakan untuk menelusuri arus sungai dan 
            mencatat keadaan yang ada di sungai tersebut. Keadaan berupa tingkat keasaman (Ph), kekeruhan, dan sebagainya. <br/>
            <br/>
            <b>Cara kerja Water Sensor</b><br/>
            Projek ini akan melepas sebuah pelampung ke sungai yang akan diteliti. Lalu, pelampung akan mencatat dan mengirimkan data ke server yang kemudian ditampilkan kembali melalui website ini.
            Pada halaman dashboard akan menampilkan data secara Real-Time, dengan menampilkan titik lokasi dan grafik perubahan data.
            <br/><br/>
            Kemudian data-data ini akan disimpan ke dalam database sesuai dengan masing-masing sensor yang ada pada pelampung.
            Data-data tersebut dapat diakses kembali pada menu Feeds.
          </div>
    </div>
  );
}

export default about