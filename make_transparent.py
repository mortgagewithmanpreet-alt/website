from PIL import Image

def main():
    img_path = 'c:/react project/m2/public/logo-new.png'
    img = Image.open(img_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    # Get the top-left pixel color as the reference background color
    bg_color = datas[0]
    print(f"Top-left pixel color: {bg_color}")

    new_data = []
    # Using a threshold of 35 to catch slightly off-white/light grey pixels in the background
    threshold = 35

    for item in datas:
        r_diff = abs(item[0] - bg_color[0])
        g_diff = abs(item[1] - bg_color[1])
        b_diff = abs(item[2] - bg_color[2])
        
        # If the pixel is very close to the background color, make it transparent
        if r_diff < threshold and g_diff < threshold and b_diff < threshold:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(img_path, "PNG")
    print("Logo background converted to transparent successfully.")

if __name__ == '__main__':
    main()
