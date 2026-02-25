$("#imageUpload").on("change", function() {
      if (this.files.length > 0) {
        $("#fileName").text(this.files[0].name);
        $("#previewImage").attr("src", URL.createObjectURL(this.files[0]));
      } else {
        $("#fileName").text("No file selected");
      }
    });
  
    $("#previewImage").on("change", function() {
      if (this.files.length > 0) {
        $("#fileName").text(this.files[0].name);
      } else {
        $("#fileName").text("No file selected");
      }
    });


    $("#del-btn").on("click", function(){
       const id = $(this).data("id");
       window.location.href = "/delete/" + id;
    });
     $("#edit-btn").on("click", function(){
       const id = $(this).data("id");
       window.location.href = "/edit/" + id;
    });
